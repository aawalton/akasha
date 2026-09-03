import { readFileSync } from "node:fs"
import { join } from "node:path"
import { textAt, valueAt } from "@akasha/pages-system/page-value"
import { parseAllDocuments, stringify } from "yaml"
import { git } from "../../repo/git/git.ts"
import { sidecarFor, valuesIn } from "../../tools/lib/page-secret.ts"
import type { Plan } from "../deploy/deploy.ts"
import { type Ran, runKubectlOn } from "../kubectl/kubectl.ts"
import { DeployRefused } from "../refusal/refusal.ts"

const SECRET_GLOB = "*.secret.ts"

const VALUE_KEY = "value"

const EVERY_KEY = "*"

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

export interface SecretPage {
  readonly slug: string
  readonly relPath: string
  readonly resourceName: string
  readonly resourceKey: string
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
    const resourceName = textAt(value, RESOURCE_NAME)
    const resourceKey = textAt(value, RESOURCE_KEY)
    if (slug === null || resourceName === null || resourceKey === null) continue
    found.push({ slug, relPath: one, resourceName, resourceKey })
  }
  return found
}

function placedAt(pages: readonly SecretPage[]): ReadonlyMap<string, SecretPage> {
  const at = new Map<string, SecretPage>()
  for (const page of pages) {
    const key = keyFor(page.resourceName, page.resourceKey)
    const held = at.get(key)
    if (held !== undefined) {
      throw new DeployRefused(
        `${held.slug} and ${page.slug} both place a value in ${page.resourceName} under ${page.resourceKey}, so which one the cluster would hold is unsettled`
      )
    }
    at.set(key, page)
  }
  return at
}

function valueOf(akasha: string, page: SecretPage): string {
  const sidecar = sidecarFor(page.relPath)
  if (sidecar === null) {
    throw new DeployRefused(`${page.relPath} is not a page, so no sops file names its value`)
  }
  let cipher: string
  try {
    cipher = readFileSync(join(akasha, sidecar), "utf8")
  } catch {
    throw new DeployRefused(
      `${page.slug} places a value in ${page.resourceName} under ${page.resourceKey}, and ${sidecar} does not exist, so it holds no value to place`
    )
  }
  const read = valuesIn(akasha, sidecar, cipher)
  if (read.values === null) throw new DeployRefused(read.why)
  const held = read.values.get(VALUE_KEY)
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
      const every = pages.filter((one) => one.resourceName === demand.name)
      if (every.length === 0) unplaced.push(demand)
      for (const page of every) keys.add(page.resourceKey)
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
        ["apply", "--server-side", "--force-conflicts", "-n", plan.service.namespace, "-f", "-"],
        stringify({
          apiVersion: "v1",
          kind: "Secret",
          metadata: { name, namespace: plan.service.namespace },
          type: "Opaque",
          stringData: values,
        })
      )
    )
    placed.push({ name, keys: [...keys].sort() })
  }
  return { placed, unplaced, consulted: pages.length, ran }
}
