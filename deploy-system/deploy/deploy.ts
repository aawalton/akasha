import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname } from "node:path"
import { discoverSynthFiles, generatedPathFor, loadSynthOutputs } from "@infra/k8s-synth/manifests"
import { parseAllDocuments } from "yaml"
import { type Ran, runKubectl } from "../kubectl/kubectl.ts"
import { DeployRefused } from "../refusal/refusal.ts"
import type { ClusterService, Service } from "../service/service.ts"

const ROLLED_OUT: ReadonlySet<string> = new Set(["Deployment", "StatefulSet", "DaemonSet"])

const STAND_INS: readonly { readonly what: string; readonly found: RegExp }[] = [
  {
    what: "a checksum left for something after the synth to fill in, rather than a digest",
    found:
      /^\s*(checksum\/[A-Za-z0-9][A-Za-z0-9._-]*):[ \t]*(?!["']?[0-9a-f]{32,64}["']?[ \t]*$)\S.*$/gm,
  },
  {
    what: "an image a synth cannot know, which is filled in from what the build produced",
    found: /^\s*(image):\s*\S*MUST_BE_SET\S*\s*$/gm,
  },
]

export interface Workload {
  readonly kind: string
  readonly name: string
  readonly namespace: string | null
}

export interface Manifest {
  readonly name: string
  readonly path: string
  readonly yaml: string
  readonly workloads: readonly Workload[]
}

export interface Plan {
  readonly service: ClusterService
  readonly synthPath: string
  readonly manifests: readonly Manifest[]
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

function textAt(from: unknown, key: string): string | null {
  if (!isRecord(from)) return null
  const value = from[key]
  return typeof value === "string" ? value : null
}

export function workloadsIn(yaml: string): readonly Workload[] {
  const found: Workload[] = []
  for (const document of parseAllDocuments(yaml)) {
    const body: unknown = document.toJS()
    const kind = textAt(body, "kind")
    if (kind === null) continue
    const metadata = isRecord(body) ? body.metadata : undefined
    const name = textAt(metadata, "name")
    if (name === null) continue
    found.push({ kind, name, namespace: textAt(metadata, "namespace") })
  }
  return found
}

function carries(manifest: Manifest, service: ClusterService): boolean {
  return manifest.workloads.some(
    (one) =>
      one.kind === service.resourceKind &&
      one.name === service.resourceName &&
      (one.namespace ?? service.namespace) === service.namespace
  )
}

function opensTheNamespace(manifest: Manifest, service: ClusterService): boolean {
  return manifest.workloads.some(
    (one) => one.kind === "Namespace" && one.name === service.namespace
  )
}

async function manifestsOf(synthPath: string): Promise<readonly Manifest[]> {
  const entries = await loadSynthOutputs(synthPath)
  return entries.map((entry) => ({
    name: entry.name,
    path: generatedPathFor(synthPath, entry.name),
    yaml: entry.yaml,
    workloads: workloadsIn(entry.yaml),
  }))
}

function inApplyOrder(
  manifests: readonly Manifest[],
  service: ClusterService
): readonly Manifest[] {
  const namespaces = manifests.filter((one) => opensTheNamespace(one, service))
  const workload = manifests.filter((one) => carries(one, service))
  const between = manifests.filter((one) => !namespaces.includes(one) && !workload.includes(one))
  return [...namespaces, ...between, ...workload]
}

export function clusterService(service: Service): ClusterService {
  if (service.where !== "cluster") {
    throw new DeployRefused(
      `${service.slug} runs on a workstation rather than the cluster, and a deploy carries a cluster service; \`ops service restart ${service.slug}\` is what moves this one`
    )
  }
  return service
}

export async function planFor(akasha: string, service: ClusterService): Promise<Plan> {
  const found: { synthPath: string; manifests: readonly Manifest[] }[] = []
  for (const synthPath of discoverSynthFiles(akasha)) {
    const manifests = await manifestsOf(synthPath)
    if (manifests.some((one) => carries(one, service))) found.push({ synthPath, manifests })
  }
  if (found.length === 0) {
    throw new DeployRefused(
      `no synth.ts emits ${service.resourceKind}/${service.resourceName} in namespace ${service.namespace}, which is the workload ${service.slug} names, so there is nothing to apply`
    )
  }
  if (found.length > 1) {
    throw new DeployRefused(
      `${found.length} synth.ts files emit ${service.resourceKind}/${service.resourceName} in namespace ${service.namespace}, so which one deploys ${service.slug} is unsettled: ${found.map((one) => relativeTo(akasha, one.synthPath)).join(", ")}`
    )
  }
  const only = found[0] as { synthPath: string; manifests: readonly Manifest[] }
  return {
    service,
    synthPath: only.synthPath,
    manifests: inApplyOrder(only.manifests, service),
  }
}

export function standInsIn(manifest: Manifest): readonly string[] {
  const left: string[] = []
  for (const standIn of STAND_INS) {
    for (const found of manifest.yaml.matchAll(standIn.found)) {
      const key = found[1]
      if (key !== undefined) left.push(`${key} — ${standIn.what}`)
    }
  }
  return left
}

export function refuseStandIns(akasha: string, plan: Plan): void {
  const left = plan.manifests.flatMap((manifest) =>
    standInsIn(manifest).map((one) => `${relativeTo(akasha, manifest.path)}: ${one}`)
  )
  if (left.length === 0) return
  throw new DeployRefused(
    `${plan.service.slug} is emitted carrying a stand-in for a value its synth cannot know, and applying it as it stands would write the stand-in itself into the cluster:\n       ${[...new Set(left)].join("\n       ")}`
  )
}

export function relativeTo(akasha: string, path: string): string {
  return path.startsWith(`${akasha}/`) ? path.slice(akasha.length + 1) : path
}

export function writeManifests(plan: Plan): readonly string[] {
  const written: string[] = []
  for (const manifest of plan.manifests) {
    let onDisk: string | null = null
    try {
      onDisk = readFileSync(manifest.path, "utf8")
    } catch {
      onDisk = null
    }
    if (onDisk === manifest.yaml) continue
    mkdirSync(dirname(manifest.path), { recursive: true })
    writeFileSync(manifest.path, manifest.yaml, "utf8")
    written.push(manifest.path)
  }
  return written
}

export function applyOf(plan: Plan, manifest: Manifest): readonly string[] {
  const namespaced = opensTheNamespace(manifest, plan.service) ? [] : ["-n", plan.service.namespace]
  return ["apply", "--server-side", "--force-conflicts", ...namespaced, "-f", manifest.path]
}

export function rolloutOf(plan: Plan): readonly string[] | null {
  if (!ROLLED_OUT.has(plan.service.resourceKind)) return null
  return [
    "rollout",
    "status",
    `${plan.service.resourceKind.toLowerCase()}/${plan.service.resourceName}`,
    "-n",
    plan.service.namespace,
    "--timeout",
    "5m",
  ]
}

export interface Deployed {
  readonly plan: Plan
  readonly written: readonly string[]
  readonly ran: readonly Ran[]
}

export async function deploy(
  akasha: string,
  plan: Plan,
  awaitRollout = true
): Promise<Deployed> {
  refuseStandIns(akasha, plan)
  const written = writeManifests(plan)
  const ran: Ran[] = []
  for (const manifest of plan.manifests) {
    const one = runKubectl(applyOf(plan, manifest))
    ran.push(one)
    if (one.code !== 0) return { plan, written, ran }
  }
  if (!awaitRollout) return { plan, written, ran }
  const rollout = rolloutOf(plan)
  if (rollout !== null) ran.push(runKubectl(rollout))
  return { plan, written, ran }
}
