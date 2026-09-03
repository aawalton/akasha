import {
  type Cluster,
  classOf,
  containersPath,
  refusal,
  selected,
} from "../ci-dispatch-cluster/ci-dispatch-cluster.module.code.ts"
import type {
  CapacityReading,
  NodeCapacity,
} from "../ci-dispatch-shapes/ci-dispatch-shapes.module.code.ts"

export const CI_MEMBER_KEY = "alanwalton.com/workload-class.ci"

const CI_MEMBER_SELECTOR = `${CI_MEMBER_KEY}=true`

const NODES_PATH = "/api/v1/nodes"

const MANAGED_BY_KEY = "app.kubernetes.io/managed-by"

const PIPELINE_ENGINE = "pipeline-engine"

const MIRROR_ANNOTATION_KEY = "kubernetes.io/config.mirror"

const ACTIVE_PHASES: ReadonlySet<string> = new Set(["Pending", "Running", "Unknown"])

const STANDING_KINDS: ReadonlySet<string> = new Set([
  "ReplicaSet",
  "StatefulSet",
  "DaemonSet",
  "ReplicationController",
])

const MEMORY_SUFFIXES: Readonly<Record<string, number>> = {
  "": 1,
  Ki: 1024,
  Mi: 1024 ** 2,
  Gi: 1024 ** 3,
  Ti: 1024 ** 4,
  Pi: 1024 ** 5,
  Ei: 1024 ** 6,
  K: 1000,
  M: 1000 ** 2,
  G: 1000 ** 3,
  T: 1000 ** 4,
  P: 1000 ** 5,
  E: 1000 ** 6,
}

const MEMORY_SHAPE = /^(\d+(?:\.\d+)?)(Ki|Mi|Gi|Ti|Pi|Ei|K|M|G|T|P|E|)$/

export function parseCpuMillis(raw: string): number {
  const said = raw.trim()
  if (said === "") return 0
  if (said.endsWith("m")) {
    const n = Number(said.slice(0, -1))
    return Number.isFinite(n) ? Math.round(n) : 0
  }
  const n = Number(said)
  return Number.isFinite(n) ? Math.round(n * 1000) : 0
}

export function parseMemoryBytes(raw: string): number {
  const found = MEMORY_SHAPE.exec(raw.trim())
  if (found === null) return 0
  const n = Number(found[1])
  if (!Number.isFinite(n) || n < 0) return 0
  return Math.round(n * (MEMORY_SUFFIXES[found[2] ?? ""] ?? 1))
}

function isRecord(one: unknown): one is Record<string, unknown> {
  return one !== null && typeof one === "object" && !Array.isArray(one)
}

function at(one: unknown, key: string): unknown {
  return isRecord(one) ? one[key] : undefined
}

function textAt(one: unknown, key: string): string {
  const held = at(one, key)
  return typeof held === "string" ? held : ""
}

function itemsIn(body: unknown): readonly unknown[] {
  const items = at(body, "items")
  return Array.isArray(items) ? items : []
}

function quantityOf(container: unknown, key: "cpu" | "memory"): number {
  const raw = at(at(at(container, "resources"), "requests"), key)
  if (typeof raw !== "string" || raw === "") return 0
  return key === "cpu" ? parseCpuMillis(raw) : parseMemoryBytes(raw)
}

function sumRequests(containers: readonly unknown[], key: "cpu" | "memory"): number {
  let total = 0
  const spec = (one: unknown, which: string): readonly unknown[] => {
    const held = at(at(one, "spec"), which)
    return Array.isArray(held) ? held : []
  }
  for (const one of containers) {
    const phase = textAt(at(one, "status"), "phase")
    if (!ACTIVE_PHASES.has(phase === "" ? "Unknown" : phase)) continue
    for (const each of spec(one, "containers")) total += quantityOf(each, key)
    let initMost = 0
    for (const each of spec(one, "initContainers")) {
      const held = quantityOf(each, key)
      if (held > initMost) initMost = held
    }
    if (initMost > total) total = initMost
  }
  return total
}

function isStepContainer(one: unknown): boolean {
  return textAt(at(at(one, "metadata"), "labels"), MANAGED_BY_KEY) === PIPELINE_ENGINE
}

function isStandingResident(one: unknown): boolean {
  if (isStepContainer(one)) return false
  if (at(at(at(one, "metadata"), "annotations"), MIRROR_ANNOTATION_KEY) !== undefined) return true
  const refs = at(at(one, "metadata"), "ownerReferences")
  const owners = Array.isArray(refs) ? refs : []
  const owner = owners.find((each) => at(each, "controller") === true) ?? owners[0]
  const kind = textAt(owner, "kind")
  return kind !== "" && STANDING_KINDS.has(kind)
}

function isUnboundCiContainer(one: unknown): boolean {
  if (textAt(at(one, "spec"), "nodeName") !== "") return false
  return textAt(at(at(one, "spec"), "nodeSelector"), CI_MEMBER_KEY) === "true"
}

function namesIn(containers: readonly unknown[], into: Set<string>): void {
  for (const one of containers) {
    const name = textAt(at(one, "metadata"), "name")
    if (name !== "") into.add(name)
  }
}

async function listing(cluster: Cluster, what: string, path: string): Promise<readonly unknown[]> {
  const answer = await cluster.get(path)
  if (answer.status !== 200) throw refusal(what, answer)
  return itemsIn(answer.body)
}

export async function readCapacity(cluster: Cluster): Promise<CapacityReading> {
  const nodeItems = await listing(
    cluster,
    "the ci nodes",
    selected(NODES_PATH, { labelSelector: CI_MEMBER_SELECTOR })
  )
  const named = nodeItems
    .map((one) => ({ nodeName: textAt(at(one, "metadata"), "name"), node: one }))
    .filter((one) => one.nodeName !== "")

  const boundLists = await Promise.all(
    named.map((one) =>
      listing(
        cluster,
        `the containers on ${one.nodeName}`,
        selected(containersPath(), { fieldSelector: `spec.nodeName=${one.nodeName}` })
      )
    )
  )
  const unbound = (
    await listing(
      cluster,
      "the containers awaiting a node",
      selected(containersPath(), { fieldSelector: "spec.nodeName=" })
    )
  ).filter(isUnboundCiContainer)

  const unboundCpu = sumRequests(unbound, "cpu")
  const unboundMemory = sumRequests(unbound, "memory")

  const nodes: NodeCapacity[] = named.map((one, i) => {
    const allocatable = at(at(one.node, "status"), "allocatable")
    const allocCpu = parseCpuMillis(textAt(allocatable, "cpu"))
    const allocMemory = parseMemoryBytes(textAt(allocatable, "memory"))
    const bound = boundLists[i] ?? []
    const residents = bound.filter(isStandingResident)
    return {
      nodeName: one.nodeName,
      cpuMillisAvailable: Math.max(0, allocCpu - sumRequests(bound, "cpu") - unboundCpu),
      memoryBytesAvailable: Math.max(0, allocMemory - sumRequests(bound, "memory") - unboundMemory),
      cpuMillisCapacity: Math.max(0, allocCpu - sumRequests(residents, "cpu")),
      memoryBytesCapacity: Math.max(0, allocMemory - sumRequests(residents, "memory")),
    }
  })

  const observedContainerNames = new Set<string>()
  for (const list of boundLists) namesIn(list, observedContainerNames)
  namesIn(unbound, observedContainerNames)

  return { nodes, observedContainerNames }
}

const NOTHING_PLACEABLE: CapacityReading = { nodes: [], observedContainerNames: new Set() }

export async function readCapacityFailClosed(
  cluster: Cluster,
  say: (line: string, err: unknown) => void
): Promise<CapacityReading> {
  try {
    return await readCapacity(cluster)
  } catch (err) {
    const status = err instanceof Error ? Number(/HTTP (\d+)/.exec(err.message)?.[1]) : Number.NaN
    const kind = classOf(Number.isFinite(status) ? status : null)
    say(
      `capacity-read-failed class=${kind} — admitting nothing this tick rather than guessing at room`,
      err
    )
    return NOTHING_PLACEABLE
  }
}
