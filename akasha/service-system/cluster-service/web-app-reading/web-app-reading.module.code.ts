import { execFileSync } from "node:child_process"
import { existsSync, readFileSync } from "node:fs"
import { basename, join } from "node:path"

const WEB_APP_SUFFIX = ".web-app.md"
const CLUSTER_SERVICE_SUFFIX = ".cluster-service.md"
const MARKDOWN_SUFFIX = ".md"
const ATTACHMENT_SUFFIX = ".code.attachment.ts"
const FENCE = "---"
const LIST_MARK = "- "
const CLUSTER_SERVICE_SLUGS = "cluster-service-slugs"
const TITLE = "title"
const KIND = "kind"
const NAMESPACE = "namespace"
const RESOURCE_NAME = "resource-name"
const QUIETLY: ["ignore", "pipe", "ignore"] = ["ignore", "pipe", "ignore"]

export interface Workload {
  readonly kind: string
  readonly name: string
  readonly namespace: string
}

export interface Deployable {
  readonly slug: string
  readonly title: string
  readonly pagePath: string
  readonly servicePath: string
  readonly synthPath: string
  readonly clusterServiceSlug: string
  readonly workload: Workload
}

export type Read = { readonly deployable: Deployable } | { readonly refused: string }

export type Front = ReadonlyMap<string, readonly string[]>

function unquoted(said: string): string {
  const held = said.trim()
  if (held.length < 2) return held
  const opening = held.slice(0, 1)
  if ((opening === '"' || opening === "'") && held.endsWith(opening)) return held.slice(1, -1)
  return held
}

function spelledOut(said: string): readonly string[] {
  if (!said.startsWith("[") || !said.endsWith("]")) return [said]
  const inside = said.slice(1, -1).trim()
  if (inside === "") return []
  return inside.split(",").map(unquoted)
}

export function frontmatterOf(text: string): Front {
  const lines = text.split("\n")
  const found = new Map<string, string[]>()
  if (lines[0]?.trim() !== FENCE) return found
  let standing: string | null = null
  for (const line of lines.slice(1)) {
    if (line.trim() === FENCE) break
    if (line.startsWith(" ") || line.startsWith("\t")) {
      const held = line.trim()
      if (standing === null || !held.startsWith(LIST_MARK)) continue
      found.get(standing)?.push(unquoted(held.slice(LIST_MARK.length)))
      continue
    }
    const at = line.indexOf(":")
    if (at === -1) continue
    standing = line.slice(0, at).trim()
    const said = unquoted(line.slice(at + 1))
    found.set(standing, said === "" ? [] : [...spelledOut(said)])
  }
  return found
}

export function firstOf(front: Front, key: string): string | null {
  return front.get(key)?.[0] ?? null
}

export function pagesUnder(root: string, suffix: string): readonly string[] | null {
  try {
    const held = execFileSync("git", ["-C", root, "ls-files", "-z", "--", `*${suffix}`], {
      encoding: "utf8",
      stdio: QUIETLY,
    })
    return held.split("\0").filter((one) => one !== "")
  } catch {
    return null
  }
}

export function namedAmong(
  paths: readonly string[],
  slug: string,
  suffix: string
): readonly string[] {
  return paths.filter((one) => basename(one) === `${slug}${suffix}`)
}

export function workloadIn(front: Front): Workload | null {
  const kind = firstOf(front, KIND)
  const namespace = firstOf(front, NAMESPACE)
  const name = firstOf(front, RESOURCE_NAME)
  if (kind === null || namespace === null || name === null) return null
  return { kind, name, namespace }
}

export function synthBeside(servicePath: string): string {
  return `${servicePath.slice(0, -MARKDOWN_SUFFIX.length)}${ATTACHMENT_SUFFIX}`
}

function frontAt(root: string, path: string): Front | null {
  try {
    return frontmatterOf(readFileSync(join(root, path), "utf8"))
  } catch {
    return null
  }
}

function serviceFor(root: string, slug: string, from: string): Read | string {
  const pages = pagesUnder(root, CLUSTER_SERVICE_SUFFIX)
  if (pages === null)
    return { refused: `git could not list the cluster service pages under ${root}` }
  const named = namedAmong(pages, slug, CLUSTER_SERVICE_SUFFIX)
  if (named.length === 0) {
    return {
      refused: `${from} names the cluster service \`${slug}\`, which no page describes, so nothing says what the cluster runs`,
    }
  }
  if (named.length > 1) {
    return {
      refused: `${named.length} cluster service pages are named \`${slug}\`, so which workload is meant is unsettled: ${named.join(", ")}`,
    }
  }
  return named[0] as string
}

export function deployableNamed(root: string, slug: string): Read {
  const webApps = pagesUnder(root, WEB_APP_SUFFIX)
  if (webApps === null) return { refused: `git could not list the web app pages under ${root}` }
  const named = namedAmong(webApps, slug, WEB_APP_SUFFIX)
  if (named.length === 0) {
    return {
      refused: `no web app page is named \`${slug}\`, and ${webApps.length} web apps have one: ${webApps.map((one) => basename(one, WEB_APP_SUFFIX)).join(", ")}`,
    }
  }
  if (named.length > 1) {
    return {
      refused: `${named.length} web app pages are named \`${slug}\`: ${named.join(", ")}`,
    }
  }
  const pagePath = named[0] as string
  const front = frontAt(root, pagePath)
  if (front === null)
    return { refused: `${pagePath} would not open, so the web app it states is not read` }
  const serviceSlugs = front.get(CLUSTER_SERVICE_SLUGS) ?? []
  if (serviceSlugs.length === 0) {
    return {
      refused: `${pagePath} names no cluster service, so nothing says what the cluster runs for \`${slug}\``,
    }
  }
  if (serviceSlugs.length > 1) {
    return {
      refused: `${pagePath} names ${serviceSlugs.length} cluster services, so which one is put up for \`${slug}\` is unsettled: ${serviceSlugs.join(", ")}`,
    }
  }
  const clusterServiceSlug = serviceSlugs[0] as string
  const found = serviceFor(root, clusterServiceSlug, pagePath)
  if (typeof found !== "string") return found
  const serviceFront = frontAt(root, found)
  if (serviceFront === null) {
    return { refused: `${found} would not open, so the workload it states is not read` }
  }
  const workload = workloadIn(serviceFront)
  if (workload === null) {
    return {
      refused: `${found} states no kind, namespace and resource name together, so it names no workload`,
    }
  }
  const synthPath = synthBeside(found)
  if (!existsSync(join(root, synthPath))) {
    return {
      refused: `${found} has no code beside it at ${synthPath}, so nothing says what \`${slug}\` is made of`,
    }
  }
  return {
    deployable: {
      slug,
      title: firstOf(front, TITLE) ?? slug,
      pagePath,
      servicePath: found,
      synthPath,
      clusterServiceSlug,
      workload,
    },
  }
}
