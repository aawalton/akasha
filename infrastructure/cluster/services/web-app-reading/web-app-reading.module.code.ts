import { existsSync } from "node:fs"
import { join } from "node:path"
import { listedAt, slugsOfType } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import type { Value } from "akasha/pages/value/page-value.module.code.ts"
import { numberAt, textAt, textsAt, valueAt } from "akasha/pages/value/page-value.module.code.ts"

export const WEB_APP_TYPE = "web-app"
export const CLUSTER_SERVICE_TYPE = "cluster-service"
export const MANIFEST_TYPE = "manifest"
const MANIFEST_SUFFIX = ".manifest.ts"
const MANIFEST_CODE_SUFFIX = ".manifest.code.ts"
const CLUSTER_SERVICES = "clusterServices"
const SOURCE_DIRECTORY = "sourceDirectory"
const BUILD_COMMAND = "buildCommand"
const HOSTNAMES = "hostnames"
const RESOURCE_KIND = "resourceKind"
const NAMESPACE = "namespace"
const RESOURCE_NAME = "resourceName"
const IMAGE = "image"
const REPLICAS = "replicas"
const CONTAINER_PORT = "containerPort"
const MANIFEST = "manifest"
const WEB_APP_NEEDS = [SOURCE_DIRECTORY, BUILD_COMMAND]
const CLUSTER_SERVICE_NEEDS = [
  RESOURCE_KIND,
  NAMESPACE,
  RESOURCE_NAME,
  IMAGE,
  REPLICAS,
  CONTAINER_PORT,
  MANIFEST,
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
  readonly manifestPath: string
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

export function pathsNamed(root: string, pageTypeSlug: string, slug: string): readonly string[] {
  return listedAt(root, pageTypeSlug, slug).map((one) => one.path)
}

export function codeBeside(manifestPath: string): string {
  return `${manifestPath.slice(0, -MANIFEST_SUFFIX.length)}${MANIFEST_CODE_SUFFIX}`
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
  const named = pathsNamed(root, CLUSTER_SERVICE_TYPE, slug)
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

function manifestFor(root: string, slug: string, from: string): Read | string {
  const named = pathsNamed(root, MANIFEST_TYPE, slug)
  if (named.length === 0) {
    return {
      refused: `${from} names the manifest \`${slug}\`, which no page describes, so nothing says what the cluster is given`,
    }
  }
  if (named.length > 1) {
    return {
      refused: `${named.length} manifest pages are named \`${slug}\`, so which resources are meant is unsettled: ${named.join(", ")}`,
    }
  }
  return named[0] as string
}

export function deployableNamed(root: string, slug: string): Read {
  const named = pathsNamed(root, WEB_APP_TYPE, slug)
  if (named.length === 0) {
    const every = slugsOfType(root, WEB_APP_TYPE)
    return {
      refused: `no web app page is named \`${slug}\`, and ${every.length} web apps have one: ${every.join(", ")}`,
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
  const serviceSlugs = textsAt(stated, CLUSTER_SERVICES) ?? []
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
  const manifestPath = manifestFor(root, textAt(service, MANIFEST) as string, found)
  if (typeof manifestPath !== "string") return manifestPath
  const synthPath = codeBeside(manifestPath)
  if (!existsSync(join(root, synthPath))) {
    return {
      refused: `${manifestPath} carries its code at ${synthPath}, and no file is there, so nothing says what \`${slug}\` is made of`,
    }
  }
  return {
    deployable: {
      slug,
      pagePath,
      servicePath: found,
      manifestPath,
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
