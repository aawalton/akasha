import { readFileSync } from "node:fs"
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
  readonly glob: string
}

/**
 * Where a service page is found, as the `files` glob its page type states.
 *
 * A GLOB RATHER THAN A DIRECTORY, because a service's page is held in the service's own folder
 * beside the synth that emits it, and those folders are spread across the tree by what each
 * service is for. A directory listing would find only the ones not yet moved there.
 */
const PLACES: readonly Place[] = [
  { where: "cluster", glob: "*.cluster-service.md" },
  { where: "workstation", glob: "*.workstation-service.md" },
]

/**
 * Every page the glob names, asked of git rather than of the filesystem.
 *
 * WALKING THE TREE IS NOT AN OPTION: `**` over this repository descends every `node_modules`, and
 * a scan for one page type took three minutes before it was killed. Git holds the same answer as
 * an index it already keeps. A page reaches the store through a commit, so a page git does not
 * hold is a page nothing else can read either.
 */
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

function serviceFrom(place: Place, path: string): Service {
  const fm = parseFrontmatter(readFileSync(path, "utf8"))
  const slug = textField(fm, "slug")
  if (slug === null)
    throw new DeployRefused(`${path} states no slug, so nothing can name the service it is`)
  const title = textField(fm, "title") ?? slug
  if (place.where === "workstation") {
    return { where: "workstation", slug, title, enabled: textField(fm, "enabled") !== "false" }
  }
  const resourceKind = textField(fm, "kind")
  const namespace = textField(fm, "namespace")
  const resourceName = textField(fm, "resource-name")
  if (resourceKind === null || namespace === null || resourceName === null) {
    throw new DeployRefused(
      `${path} states no ${resourceKind === null ? "kind" : namespace === null ? "namespace" : "resource-name"}, so nothing says which workload it is`
    )
  }
  return { where: "cluster", slug, title, resourceKind, namespace, resourceName }
}

export function everyService(akasha: string): readonly Service[] {
  const found: Service[] = []
  for (const place of PLACES) {
    for (const path of pagesIn(akasha, place)) found.push(serviceFrom(place, path))
  }
  return found
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
