import { join } from "node:path"
import { git } from "@akasha/git/git-capping"
import { secretAt } from "@akasha/pages/page-file-name"
import { type Secrets, secretsIn } from "@akasha/pages/page-secret"
import { textAt, type Value, valueAt } from "@akasha/pages/page-value"
import { parseAllDocuments, stringify } from "yaml"
import {
  type Plan,
  type Ran,
  runKubectlOn,
} from "../../cluster-services/workload-deploying/workload-deploying.module.code.ts"

// The refusal deploy-system raised. It came from `deploy-system/refusal/refusal.ts`, which went
// with the rest of that folder, and nothing inside akasha replaced it, so it sits here beside
// its only thrower.
export class DeployRefused extends Error {
  constructor(message: string) {
    super(message)
    this.name = "DeployRefused"
  }
}

const SECRET_GLOB = "*.secret.ts"

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

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function walk(node: unknown, found: Demand[]): void {
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

export function demandedBy(plan: Plan): readonly Demand[] {
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
  const held = git(akasha, ["ls-files", "-z", "--", `*/${SECRET_GLOB}`, SECRET_GLOB])
  if (held.code !== 0) {
    throw new DeployRefused(
      `git could not list the secret pages under ${akasha}: ${held.stderr.trim()}`
    )
  }
  const found: SecretPage[] = []
  for (const one of held.stdout.split("\0")) {
    if (one === "") continue
    const value = valueAt(join(akasha, one), akasha)
    if (value === null) continue
    const slug = textAt(value, "slug")
    if (slug === null) continue
    const placements = placementsIn(value)
    if (placements.length === 0) continue
    found.push({ slug, relPath: one, placements })
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

function valueOf(akasha: string, page: SecretPage): string {
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
  const pages = secretPages(akasha)
  const at = placedAt(pages)

  const wanted = new Map<string, Set<string>>()
  const unplaced: Demand[] = []
  for (const demand of demands) {
    const keys = wanted.get(demand.name) ?? new Set<string>()
    if (demand.key === EVERY_KEY) {
      const every = pages.flatMap((one) =>
        one.placements.filter((two) => two.resourceName === demand.name)
      )
      if (every.length === 0) unplaced.push(demand)
      for (const placement of every) keys.add(placement.resourceKey)
    } else if (at.has(keyFor(demand.name, demand.key))) {
      keys.add(demand.key)
    } else {
      unplaced.push(demand)
    }
    wanted.set(demand.name, keys)
  }

  const placed: Placed[] = []
  const ran: Ran[] = []
  for (const [name, keys] of [...wanted].sort((one, other) => one[0].localeCompare(other[0]))) {
    if (keys.size === 0) continue
    const values: Record<string, string> = {}
    for (const key of [...keys].sort()) {
      values[key] = valueOf(akasha, at.get(keyFor(name, key)) as SecretPage)
    }
    ran.push(
      runKubectlOn(
        ["apply", "--server-side", "--force-conflicts", "-n", plan.workload.namespace, "-f", "-"],
        stringify({
          apiVersion: "v1",
          kind: "Secret",
          metadata: { name, namespace: plan.workload.namespace },
          type: "Opaque",
          stringData: values,
        })
      )
    )
    placed.push({ name, keys: [...keys].sort() })
  }
  return { placed, unplaced, consulted: pages.length, ran }
}
