import { readFileSync } from "node:fs"
import { createRequire } from "node:module"
import { join } from "node:path"
import { parseFrontmatter, textField } from "../../page/frontmatter.ts"
import { git } from "../../repo/git/git.ts"
import { DeployRefused } from "../refusal/refusal.ts"

export interface ClusterService {
  readonly where: "cluster"
  readonly slug: string
  readonly title: string
  readonly resourceKind: string
  readonly namespace: string
  readonly resourceName: string
}

export interface WorkstationService {
  readonly where: "workstation"
  readonly slug: string
  readonly title: string
  readonly enabled: boolean
}

export type Service = ClusterService | WorkstationService

interface Place {
  readonly where: Service["where"]
  readonly pageTypeSlug: string
  readonly glob: string
}

const TYPESCRIPT = ".ts"

// A service page is markdown or TypeScript. The markdown spelling is listed first of each
// pair, so where a service carries both halves the markdown one stands and the TypeScript one
// is passed over, which is what deploy has always planned from. A service carrying only the
// TypeScript half is seen here rather than missed, because a caller reads not being here as
// not existing: `serviceNamed` refuses the slug, and `forgetGone` deletes its deploy record.
const PLACES: readonly Place[] = [
  { where: "cluster", pageTypeSlug: "cluster-service", glob: "*.cluster-service.md" },
  { where: "cluster", pageTypeSlug: "cluster-service", glob: `*.cluster-service${TYPESCRIPT}` },
  { where: "workstation", pageTypeSlug: "workstation-service", glob: "*.workstation-service.md" },
  {
    where: "workstation",
    pageTypeSlug: "workstation-service",
    glob: `*.workstation-service${TYPESCRIPT}`,
  },
]

const loadFrom = createRequire(import.meta.url)

function pagesIn(akasha: string, place: Place): readonly string[] {
  const held = git(akasha, ["ls-files", "-z", "--", `*/${place.glob}`, place.glob])
  if (held.code !== 0) {
    throw new DeployRefused(
      `git could not list the ${place.where} service pages under ${akasha}: ${held.stderr.trim()}`
    )
  }
  return held.stdout
    .split("\0")
    .filter((one) => one !== "")
    .map((one) => join(akasha, one))
    .sort()
}

interface Stated {
  readonly slug: string | null
  readonly title: string | null
  readonly enabled: boolean
  readonly resourceKind: string | null
  readonly namespace: string | null
  readonly resourceName: string | null
}

function pageIn(place: Place, path: string): Record<string, unknown> {
  let held: Record<string, unknown>
  try {
    held = loadFrom(path) as Record<string, unknown>
  } catch (cause) {
    throw new DeployRefused(
      `${path} is a ${place.where} service page and would not load, so what it states could ` +
        `not be read: ${cause instanceof Error ? cause.message : String(cause)}`
    )
  }
  for (const value of Object.values(held)) {
    if (value === null || typeof value !== "object" || Array.isArray(value)) continue
    const said = value as Record<string, unknown>
    if (said["pageTypeSlug"] === place.pageTypeSlug) return said
  }
  throw new DeployRefused(
    `${path} exports no ${place.pageTypeSlug} page, so nothing there names a service`
  )
}

function saidIn(said: Record<string, unknown>, key: string): string | null {
  const held = said[key]
  return typeof held === "string" && held !== "" ? held : null
}

function statedIn(place: Place, path: string): Stated {
  if (path.endsWith(TYPESCRIPT)) {
    const said = pageIn(place, path)
    return {
      slug: saidIn(said, "slug"),
      title: saidIn(said, "title"),
      enabled: said["enabled"] !== false,
      resourceKind: saidIn(said, "resourceKind"),
      namespace: saidIn(said, "namespace"),
      resourceName: saidIn(said, "resourceName"),
    }
  }
  const fm = parseFrontmatter(readFileSync(path, "utf8"))
  return {
    slug: textField(fm, "slug"),
    title: textField(fm, "title"),
    enabled: textField(fm, "enabled") !== "false",
    resourceKind: textField(fm, "kind"),
    namespace: textField(fm, "namespace"),
    resourceName: textField(fm, "resource-name"),
  }
}

function serviceFrom(place: Place, path: string): Service {
  const stated = statedIn(place, path)
  const slug = stated.slug
  if (slug === null)
    throw new DeployRefused(`${path} states no slug, so nothing can name the service it is`)
  const title = stated.title ?? slug
  if (place.where === "workstation") {
    return { where: "workstation", slug, title, enabled: stated.enabled }
  }
  const { resourceKind, namespace, resourceName } = stated
  if (resourceKind === null || namespace === null || resourceName === null) {
    throw new DeployRefused(
      `${path} states no ${resourceKind === null ? "resource kind" : namespace === null ? "namespace" : "resource name"}, so nothing says which workload it is`
    )
  }
  return { where: "cluster", slug, title, resourceKind, namespace, resourceName }
}

export function everyService(akasha: string): readonly Service[] {
  const found = new Map<string, Service>()
  for (const place of PLACES) {
    for (const path of pagesIn(akasha, place)) {
      const one = serviceFrom(place, path)
      const key = `${one.where}/${one.slug}`
      if (found.has(key)) continue
      found.set(key, one)
    }
  }
  return [...found.values()]
}

export function serviceNamed(akasha: string, slug: string): Service {
  const every = everyService(akasha)
  const named = every.filter((one) => one.slug === slug)
  if (named.length === 1) return named[0] as Service
  if (named.length === 0) {
    throw new DeployRefused(
      `no service is named ${slug}; ${every.length} services have a page, and \`ops deploy --list\` names them`
    )
  }
  throw new DeployRefused(
    `${named.length} services are named ${slug}, so the name does not say which to deploy: ${named.map((one) => one.where).join(", ")}`
  )
}
