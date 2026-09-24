import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import {
  type Plan,
  type Ran,
  runKubectlOn,
} from "akasha/infrastructure/service/akasha-service/service-cluster/modules/workload-deploying/workload-deploying.module.code.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { secretAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { type Secrets, secretsIn } from "akasha/page/modules/secret/page-secret.module.code.ts"
import {
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { parseAllDocuments, stringify } from "yaml"

export class DeployRefused extends Error {
  constructor(message: string) {
    super(message)
    this.name = "DeployRefused"
  }
}

const SECRET_TYPE = "secret"

const VALUE_KEY = "value"

const EVERY_KEY = "*"

const PLACEMENTS = "placements"

const RESOURCE_NAME = "resourceName"

const RESOURCE_KEY = "resourceKey"

function keyFor(name: string, key: string): string {
  return JSON.stringify([name, key])
}

export interface Demand {
  readonly name: string
  readonly key: string
}

function walk(node: unknown, found: Demand[]): undefined {
  if (Array.isArray(node)) {
    for (const one of node) walk(one, found)
    return
  }
  if (!isRecord(node)) return
  const named = node.secretKeyRef
  if (isRecord(named) && typeof named.name === "string" && typeof named.key === "string") {
    found.push({ name: named.name, key: named.key })
  }
  const whole = node.secretRef
  if (isRecord(whole) && typeof whole.name === "string") {
    found.push({ name: whole.name, key: EVERY_KEY })
  }
  const mounted = node.secret
  if (isRecord(mounted) && typeof mounted.secretName === "string") {
    found.push({ name: mounted.secretName, key: EVERY_KEY })
  }
  for (const one of Object.values(node)) walk(one, found)
}

function demandedBy(plan: Plan): readonly Demand[] {
  const found: Demand[] = []
  for (const manifest of plan.manifests) {
    for (const document of parseAllDocuments(manifest.yaml)) walk(document.toJS(), found)
  }
  const seen = new Set<string>()
  return found.filter((one) => {
    const at = keyFor(one.name, one.key)
    if (seen.has(at)) return false
    seen.add(at)
    return true
  })
}

export interface Placement {
  readonly resourceName: string
  readonly resourceKey: string
}

export interface SecretPage {
  readonly slug: string
  readonly relPath: string
  readonly placements: readonly Placement[]
}

export function placementsIn(value: Value): readonly Placement[] {
  const held = value[PLACEMENTS]
  if (!Array.isArray(held)) return []
  const found: Placement[] = []
  for (const one of held) {
    if (!isRecord(one)) continue
    const resourceName = one[RESOURCE_NAME]
    const resourceKey = one[RESOURCE_KEY]
    if (typeof resourceName !== "string" || typeof resourceKey !== "string") continue
    found.push({ resourceName, resourceKey })
  }
  return found
}

export function secretPages(akasha: string): readonly SecretPage[] {
  const found: SecretPage[] = []
  for (const one of valuesOfType(akasha, SECRET_TYPE)) {
    const slug = textAt(one.value, "slug")
    if (slug === null) continue
    const placements = placementsIn(one.value)
    if (placements.length === 0) continue
    found.push({ slug, relPath: one.path, placements })
  }
  return found
}

export function placedAt(pages: readonly SecretPage[]): ReadonlyMap<string, SecretPage> {
  const at = new Map<string, SecretPage>()
  for (const page of pages) {
    for (const placement of page.placements) {
      const key = keyFor(placement.resourceName, placement.resourceKey)
      const held = at.get(key)
      if (held === page) {
        throw new DeployRefused(
          `${page.slug} places a value in ${placement.resourceName} under ${placement.resourceKey} twice, which is one placement written out two times`
        )
      }
      if (held !== undefined) {
        throw new DeployRefused(
          `${held.slug} and ${page.slug} both place a value in ${placement.resourceName} under ${placement.resourceKey}, so which one the cluster would hold is unsettled`
        )
      }
      at.set(key, page)
    }
  }
  return at
}

export function secretValueOf(akasha: string, page: SecretPage): string {
  const sidecar = secretAt(page.relPath)
  if (sidecar === null) {
    throw new DeployRefused(`${page.relPath} is not a page, so no sops file names its value`)
  }
  let read: Secrets | null
  try {
    read = secretsIn(akasha, page.relPath)
  } catch (thrown) {
    throw new DeployRefused(thrown instanceof Error ? thrown.message : String(thrown))
  }
  if (read === null) {
    throw new DeployRefused(`${page.slug} holds no value to place, and ${sidecar} does not exist`)
  }
  const held = read.get(VALUE_KEY)
  if (held === undefined) {
    throw new DeployRefused(
      `${sidecar} carries no \`${VALUE_KEY}\`, which is the key a secret page keeps its value under`
    )
  }
  return held
}

export interface Placed {
  readonly name: string
  readonly keys: readonly string[]
}

export interface Placing {
  readonly placed: readonly Placed[]
  readonly unplaced: readonly Demand[]
  readonly consulted: number
  readonly ran: readonly Ran[]
}

export function placeSecrets(akasha: string, plan: Plan): Placing {
  const demands = demandedBy(plan)
  if (demands.length === 0) return { placed: [], unplaced: [], consulted: 0, ran: [] }
  const workload = plan.workload
  if (workload === null) return { placed: [], unplaced: demands, consulted: 0, ran: [] }
  const pages = secretPages(akasha)
  const at = placedAt(pages)

  const wanted = new Map<string, Set<string>>()
  const unplaced: Demand[] = []
  for (const demand of demands) {
    const every = pages.flatMap((one) =>
      one.placements.filter((two) => two.resourceName === demand.name)
    )
    const found =
      demand.key === EVERY_KEY ? every.length > 0 : at.has(keyFor(demand.name, demand.key))
    if (!found) unplaced.push(demand)
    const keys = wanted.get(demand.name) ?? new Set<string>()
    for (const placement of every) keys.add(placement.resourceKey)
    wanted.set(demand.name, keys)
  }

  const placed: Placed[] = []
  const ran: Ran[] = []
  for (const [name, keys] of [...wanted].sort((one, other) => one[0].localeCompare(other[0]))) {
    if (keys.size === 0) continue
    const values: Record<string, string> = {}
    for (const key of [...keys].sort()) {
      const held = secretValueOf(akasha, at.get(keyFor(name, key)) as SecretPage)
      values[key] = Buffer.from(held, "utf8").toString("base64")
    }
    ran.push(
      runKubectlOn(
        ["apply", "--server-side", "--force-conflicts", "-n", workload.namespace, "-f", "-"],
        stringify({
          apiVersion: "v1",
          kind: "Secret",
          metadata: { name, namespace: workload.namespace },
          type: "Opaque",
          data: values,
        })
      )
    )
    placed.push({ name, keys: [...keys].sort() })
  }
  return { placed, unplaced, consulted: pages.length, ran }
}
