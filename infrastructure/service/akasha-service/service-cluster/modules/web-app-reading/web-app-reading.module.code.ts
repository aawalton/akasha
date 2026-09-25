import { existsSync } from "node:fs"
import { join } from "node:path"
import {
  listedAt,
  slugsOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"
import {
  numberAt,
  slugsIn,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

export const WEB_APP_TYPE = "web-app"
export const CLUSTER_SERVICE_TYPE = "service-cluster"
export const MANIFEST_TYPE = "manifest"
const MANIFEST_SUFFIX = ".manifest.ts"
const MANIFEST_CODE_SUFFIX = ".manifest.code.ts"
const SERVICE_CLUSTERS = "serviceClusters"
const SOURCE_DIRECTORY = "sourceDirectory"
const BUILD_COMMAND = "buildCommand"
const RESOURCE_KIND = "resourceKind"
const NAMESPACE = "namespace"
const RESOURCE_NAME = "resourceName"
const IMAGE = "image"
const REPLICAS = "replicas"
const CONTAINER_PORT = "containerPort"
const MANIFEST = "manifest"
const MANIFESTS = "manifests"
const WEB_APP_NEEDS = [SOURCE_DIRECTORY, BUILD_COMMAND]
const CLUSTER_SERVICE_NEEDS = [
  RESOURCE_KIND,
  NAMESPACE,
  RESOURCE_NAME,
  IMAGE,
  REPLICAS,
  CONTAINER_PORT,
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
  readonly manifestPath: string | null
  readonly synthPath: string | null
  readonly manifestsPath: string | null
  readonly serviceClusterSlug: string
  readonly sourceDirectory: string
  readonly buildCommand: string
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

export function manifestSlugsIn(service: Value): readonly string[] {
  return slugsIn(service[MANIFEST])
}

export function manifestsFileOf(servicePath: string, service: Value): string | null {
  const held = textAt(service, MANIFESTS)
  return held === null ? null : besideAt(servicePath, MANIFESTS, held)
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
  const serviceSlugs = slugsIn(stated[SERVICE_CLUSTERS])
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
  const serviceClusterSlug = serviceSlugs[0] as string
  const found = serviceFor(root, serviceClusterSlug, pagePath)
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
  const written = manifestsFileOf(found, service)
  if (written !== null) {
    if (!existsSync(join(root, written))) {
      return {
        refused: `${found} states its manifests at ${written}, and no file is there, so nothing says what \`${slug}\` is made of`,
      }
    }
    return {
      deployable: {
        ...shapeOf(slug, pagePath, stated, found, serviceClusterSlug, service, workload),
        manifestPath: null,
        synthPath: null,
        manifestsPath: written,
      },
    }
  }
  const manifestSlugs = manifestSlugsIn(service)
  if (manifestSlugs.length === 0) {
    return {
      refused: `${found} names no manifest, so nothing says what the cluster is given for \`${slug}\``,
    }
  }
  if (manifestSlugs.length > 1) {
    return {
      refused: `${found} names ${manifestSlugs.length} manifests, and a web app is put up as one, so which is meant for \`${slug}\` is unsettled: ${manifestSlugs.join(", ")}`,
    }
  }
  const manifestPath = manifestFor(root, manifestSlugs[0] as string, found)
  if (typeof manifestPath !== "string") return manifestPath
  const synthPath = codeBeside(manifestPath)
  if (!existsSync(join(root, synthPath))) {
    return {
      refused: `${manifestPath} carries its code at ${synthPath}, and no file is there, so nothing says what \`${slug}\` is made of`,
    }
  }
  return {
    deployable: {
      ...shapeOf(slug, pagePath, stated, found, serviceClusterSlug, service, workload),
      manifestPath,
      synthPath,
      manifestsPath: null,
    },
  }
}

type Shape = Omit<Deployable, "manifestPath" | "synthPath" | "manifestsPath">

function shapeOf(
  slug: string,
  pagePath: string,
  stated: Value,
  servicePath: string,
  serviceClusterSlug: string,
  service: Value,
  workload: Workload
): Shape {
  return {
    slug,
    pagePath,
    servicePath,
    serviceClusterSlug,
    sourceDirectory: textAt(stated, SOURCE_DIRECTORY) as string,
    buildCommand: textAt(stated, BUILD_COMMAND) as string,
    image: textAt(service, IMAGE) as string,
    replicas: numberAt(service, REPLICAS) as number,
    containerPort: numberAt(service, CONTAINER_PORT) as number,
    workload,
  }
}
