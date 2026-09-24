import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { ran as running } from "akasha/code/spawning/modules/running/running.module.code.ts"
import {
  BUILD_STAMP,
  BUILDER_AT,
  commitHere,
  SERVED_BUILD_AT,
} from "akasha/infrastructure/cluster/k8s-type/modules/orchestrator-cache/orchestrator-cache.module.code.ts"
import {
  BUN_RUNTIME_IMAGE,
  ORCHESTRATOR_CACHE_REPO_PATH,
} from "akasha/infrastructure/cluster/k8s-type/modules/orchestrator-cache-locations/orchestrator-cache-locations.module.code.ts"
import {
  buildctlAt,
  contextArgv,
  INSECURE,
} from "akasha/infrastructure/container-image/modules/image-publishing/image-publishing.module.code.ts"
import {
  CACHE_TAG,
  REGISTRY,
  refFor,
} from "akasha/infrastructure/container-image/modules/image-ref/image-ref.module.code.ts"
import {
  type BuildTarget,
  hiding,
  packageIn,
  type Resolved,
  readOut,
  saidBy,
  TRACKED,
} from "akasha/infrastructure/service/akasha-service/service-cluster/modules/web-app-building/web-app-building.module.code.ts"
import {
  carries,
  type Plan,
  type Ran,
} from "akasha/infrastructure/service/akasha-service/service-cluster/modules/workload-deploying/workload-deploying.module.code.ts"

export const WEB_APP_IMAGES = "web-app"

const TAG_LENGTH = 12

const SCRATCH_AT = "/var/tmp"

const IMAGE_SCRATCH_AT = "akasha-web-image-"

const TREE = "tree"

const MANIFESTS = "manifests"

const DOCKERFILE = "Dockerfile"

const INSTALLED_FROM = [...TRACKED, "bunfig.toml"]

const IMAGE_AT = /^[ \t-]*image:[ \t]*["']?([^"'\s]+)["']?[ \t]*$/gm

const NOTHING_HANDED: Resolved = { env: [], hidden: [], missing: [] }

export function imageTagOf(sha: string): string {
  return sha.slice(0, TAG_LENGTH)
}

export function webAppImage(name: string, sha: string = commitHere()): string {
  return refFor(`${WEB_APP_IMAGES}/${name}`, imageTagOf(sha))
}

export interface ImageTarget extends BuildTarget {
  readonly repository: string
  readonly tag: string
}

export function imageTargetOf(plan: Plan): ImageTarget | null {
  const workload = plan.workload
  if (workload === null) return null
  const carrying = plan.manifests.find((one) => carries(one, workload))
  if (carrying === undefined) return null
  const packagePath = packageIn(carrying.yaml)
  if (packagePath === null) return null
  const under = `${REGISTRY}/${WEB_APP_IMAGES}/`
  for (const found of carrying.yaml.matchAll(IMAGE_AT)) {
    const ref = found[1]
    if (ref === undefined || !ref.startsWith(under)) continue
    const at = ref.lastIndexOf(":")
    return {
      kind: workload.kind,
      namespace: workload.namespace,
      workload: workload.name,
      packagePath,
      repository: ref.slice(REGISTRY.length + 1, at),
      tag: ref.slice(at + 1),
    }
  }
  return null
}

export function imageRefOf(target: ImageTarget): string {
  return refFor(target.repository, target.tag)
}

export function webDockerfile(packagePath: string, sha: string, names: readonly string[]): string {
  const mounts = names.map((name) => `--mount=type=secret,id=${name},env=${name}`)
  const build = [
    `BUILD_DIRECTORY=${SERVED_BUILD_AT} ${ORCHESTRATOR_CACHE_REPO_PATH}/${BUILDER_AT} build`,
    `printf %s ${sha} > ${SERVED_BUILD_AT}/${BUILD_STAMP}`,
  ].join(" && ")
  return [
    `FROM ${BUN_RUNTIME_IMAGE}`,
    `WORKDIR ${ORCHESTRATOR_CACHE_REPO_PATH}`,
    `COPY ${MANIFESTS}/ ./`,
    "RUN bun install --frozen-lockfile",
    `COPY ${TREE}/ ./`,
    `WORKDIR ${ORCHESTRATOR_CACHE_REPO_PATH}/${packagePath}`,
    ["RUN", ...mounts, build].join(" "),
    "",
  ].join("\n")
}

export function imageArgv(
  context: string,
  target: ImageTarget,
  names: readonly string[]
): readonly string[] {
  const cache = refFor(target.repository, CACHE_TAG)
  return [
    ...contextArgv(context, imageRefOf(target)),
    ...names.flatMap((name) => ["--secret", `id=${name},env=${name}`]),
    "--export-cache",
    `type=registry,ref=${cache},mode=min,${INSECURE}`,
    "--import-cache",
    `type=registry,ref=${cache},${INSECURE}`,
  ]
}

export interface Imaged {
  readonly ran: readonly Ran[]
  readonly why: string | null
}

function handedIn(resolved: Resolved): Record<string, string | undefined> {
  const handed: Record<string, string | undefined> = { ...process.env }
  for (const entry of resolved.env) handed[entry.name] = entry.value
  return handed
}

export function imageBuilt(
  root: string,
  target: ImageTarget,
  sha: string,
  resolved: Resolved = NOTHING_HANDED
): Imaged {
  const held = mkdtempSync(join(SCRATCH_AT, IMAGE_SCRATCH_AT))
  try {
    const unread = readOut(root, sha, join(held, MANIFESTS), INSTALLED_FROM)
    if (unread !== null) return { ran: [], why: `the manifests tracked at ${sha} ${unread}` }
    const untreed = readOut(root, sha, join(held, TREE), [])
    if (untreed !== null) return { ran: [], why: `the tree at ${sha} ${untreed}` }
    const names = resolved.env.map((entry) => entry.name)
    writeFileSync(join(held, DOCKERFILE), webDockerfile(target.packagePath, sha, names), "utf8")
    const argv = [buildctlAt(), ...imageArgv(held, target, names)]
    const done = running(argv, { env: handedIn(resolved) })
    const made: Ran = { argv, code: done.code, stdout: done.out, stderr: done.err }
    if (done.code === 0) return { ran: [made], why: null }
    const why = `${imageRefOf(target)} would not build from ${sha}: ${saidBy(made)}`
    return { ran: [made], why: hiding(why, resolved.hidden) }
  } finally {
    rmSync(held, { recursive: true, force: true })
  }
}
