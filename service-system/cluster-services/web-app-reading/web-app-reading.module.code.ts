import { existsSync } from "node:fs"
import { basename, join } from "node:path"
import type { Value } from "@akasha/pages-system/page-value"
import { numberAt, textAt, textsAt, valueAt } from "@akasha/pages-system/page-value"
import { said } from "@akasha/utils-run/running"

const WEB_APP_SUFFIX = ".web-app.ts"
const CLUSTER_SERVICE_SUFFIX = ".cluster-service.ts"
const CLUSTER_SERVICE_SLUGS = "clusterServiceSlugs"
const SOURCE_DIRECTORY = "sourceDirectory"
const BUILD_COMMAND = "buildCommand"
const HOSTNAMES = "hostnames"
const RESOURCE_KIND = "resourceKind"
const NAMESPACE = "namespace"
const RESOURCE_NAME = "resourceName"
const IMAGE = "image"
const REPLICAS = "replicas"
const CONTAINER_PORT = "containerPort"
const MANIFEST_CODE = "manifestCode"
const WEB_APP_NEEDS = [SOURCE_DIRECTORY, BUILD_COMMAND]
const CLUSTER_SERVICE_NEEDS = [
  RESOURCE_KIND,
  NAMESPACE,
  RESOURCE_NAME,
  IMAGE,
  REPLICAS,
  CONTAINER_PORT,
  MANIFEST_CODE,
]

export interface Workload {
  readonly kind: string
  readonly name: string
  readonly namespace: string
}

export interface Deployable {
  readonly slug: string
  readonly pagePath: string
  readonly servicePath: string
  readonly synthPath: string
  readonly clusterServiceSlug: string
  readonly sourceDirectory: string
  readonly buildCommand: string
  readonly hostnames: readonly string[]
  readonly image: string
  readonly replicas: number
  readonly containerPort: number
  readonly workload: Workload
}

export type Read = { readonly deployable: Deployable } | { readonly refused: string }

export function pagesUnder(root: string, suffix: string): readonly string[] | null {
  try {
    const held = said(["git", "-C", root, "ls-files", "-z", "--", `*${suffix}`])
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

export function wantingIn(value: Value, keys: readonly string[]): readonly string[] {
  return keys.filter((one) => value[one] === undefined)
}

export function workloadIn(value: Value): Workload | null {
  const kind = textAt(value, RESOURCE_KIND)
  const namespace = textAt(value, NAMESPACE)
  const name = textAt(value, RESOURCE_NAME)
  if (kind === null || namespace === null || name === null) return null
  return { kind, name, namespace }
}

function statedAt(root: string, path: string): Value | null {
  return valueAt(path, root)
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
  const stated = statedAt(root, pagePath)
  if (stated === null)
    return { refused: `${pagePath} would not load, so the web app it states is not read` }
  const wanting = wantingIn(stated, WEB_APP_NEEDS)
  if (wanting.length > 0) {
    return {
      refused: `${pagePath} states no ${wanting.join(" and no ")}, so a deploy of \`${slug}\` would rest on what no page says`,
    }
  }
  const serviceSlugs = textsAt(stated, CLUSTER_SERVICE_SLUGS) ?? []
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
  const service = statedAt(root, found)
  if (service === null) {
    return { refused: `${found} would not load, so the workload it states is not read` }
  }
  const short = wantingIn(service, CLUSTER_SERVICE_NEEDS)
  if (short.length > 0) {
    return {
      refused: `${found} states no ${short.join(" and no ")}, so the workload \`${slug}\` is put up as is not whole`,
    }
  }
  const workload = workloadIn(service)
  if (workload === null) {
    return {
      refused: `${found} states no kind, namespace and resource name together, so it names no workload`,
    }
  }
  const synthPath = textAt(service, MANIFEST_CODE) as string
  if (!existsSync(join(root, synthPath))) {
    return {
      refused: `${found} names its manifest code at ${synthPath}, where no file stands, so nothing says what \`${slug}\` is made of`,
    }
  }
  return {
    deployable: {
      slug,
      pagePath,
      servicePath: found,
      synthPath,
      clusterServiceSlug,
      sourceDirectory: textAt(stated, SOURCE_DIRECTORY) as string,
      buildCommand: textAt(stated, BUILD_COMMAND) as string,
      hostnames: textsAt(stated, HOSTNAMES) ?? [],
      image: textAt(service, IMAGE) as string,
      replicas: numberAt(service, REPLICAS) as number,
      containerPort: numberAt(service, CONTAINER_PORT) as number,
      workload,
    },
  }
}
