import { execFileSync } from "node:child_process"
import { parseAllDocuments } from "yaml"
import type { Plan } from "../deploy/deploy.ts"
import { type Ran, runKubectl } from "../kubectl/kubectl.ts"

const SYNC_CONTAINER = "code-sync"

const REPO_PATH = "/app/repo"

const STAMP_FILE = "build/.build-sha"

const ARTIFACT = "build/server/index.js"

export function headSha(root: string): string {
  return execFileSync("git", ["-C", root, "rev-parse", "HEAD"], { encoding: "utf8" }).trim()
}

export interface BuildTarget {
  readonly namespace: string
  readonly deployment: string
  readonly packagePath: string
}

export type BuildEnv = readonly { readonly name: string; readonly value: string }[]

export type BuildEnvEntry =
  | { readonly name: string; readonly value: string }
  | { readonly name: string; readonly fromSecret: { readonly name: string; readonly key: string } }

export const BUILD_ENV_EXPORT = "BUILD_ENV"

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

function containersOf(body: unknown): readonly unknown[] {
  if (!isRecord(body)) return []
  const spec = isRecord(body.spec) ? body.spec : null
  const template = spec !== null && isRecord(spec.template) ? spec.template : null
  const pod = template !== null && isRecord(template.spec) ? template.spec : null
  const found = pod !== null ? pod.containers : undefined
  return Array.isArray(found) ? found : []
}

export function buildTargetOf(plan: Plan): BuildTarget | null {
  for (const manifest of plan.manifests) {
    for (const document of parseAllDocuments(manifest.yaml)) {
      const body: unknown = document.toJS()
      if (!isRecord(body)) continue
      const metadata = isRecord(body.metadata) ? body.metadata : null
      const name = metadata !== null ? metadata.name : undefined
      if (body.kind !== plan.service.resourceKind || name !== plan.service.resourceName) continue
      const containers = containersOf(body)
      const hasSync = containers.some((one) => isRecord(one) && one.name === SYNC_CONTAINER)
      if (!hasSync) return null
      for (const one of containers) {
        if (!isRecord(one)) continue
        const workingDir = one.workingDir
        if (typeof workingDir !== "string") continue
        if (!workingDir.startsWith(`${REPO_PATH}/`)) continue
        return {
          namespace: plan.service.namespace,
          deployment: plan.service.resourceName,
          packagePath: workingDir.slice(REPO_PATH.length + 1),
        }
      }
      return null
    }
  }
  return null
}

function exec(target: BuildTarget, pod: string, script: string): Ran {
  return runKubectl([
    "exec",
    "-n",
    target.namespace,
    "-c",
    SYNC_CONTAINER,
    pod,
    "--",
    "sh",
    "-c",
    script,
  ])
}

export function livePod(target: BuildTarget): string | null {
  const ran = runKubectl([
    "get",
    "pods",
    "-n",
    target.namespace,
    "-l",
    `app.kubernetes.io/name=${target.deployment}`,
    "--field-selector=status.phase=Running",
    "-o",
    "jsonpath={.items[0].metadata.name}",
  ])
  if (ran.code !== 0) return null
  const name = ran.stdout.trim()
  return name === "" ? null : name
}

export interface Standing {
  readonly head: string
  readonly artifact: boolean
  readonly stamp: string
}

export function standingIn(target: BuildTarget, pod: string): Standing | null {
  const ran = exec(
    target,
    pod,
    [
      `cd ${REPO_PATH} && git rev-parse HEAD`,
      `test -f ${REPO_PATH}/${target.packagePath}/${ARTIFACT} && echo yes || echo no`,
      `cat ${REPO_PATH}/${target.packagePath}/${STAMP_FILE} 2>/dev/null || echo ""`,
    ].join("; ")
  )
  if (ran.code !== 0) return null
  const lines = ran.stdout.split("\n")
  return {
    head: (lines[0] ?? "").trim(),
    artifact: (lines[1] ?? "").trim() === "yes",
    stamp: (lines[2] ?? "").trim(),
  }
}

export function alreadyBuilt(standing: Standing, sha: string): boolean {
  return standing.head === sha && standing.artifact && standing.stamp === sha
}

function envPrefix(env: BuildEnv): string {
  if (env.length === 0) return ""
  const parts = env.map((one) => `${one.name}=${JSON.stringify(one.value)}`)
  return `env ${parts.join(" ")} `
}

export function secretValue(namespace: string, secret: string, key: string): string | null {
  const ran = runKubectl([
    "get",
    "secret",
    secret,
    "-n",
    namespace,
    "-o",
    `jsonpath={.data.${key}}`,
  ])
  if (ran.code !== 0) return null
  const encoded = ran.stdout.trim()
  if (encoded === "") return null
  return Buffer.from(encoded, "base64").toString("utf8")
}

function isEntry(value: unknown): value is BuildEnvEntry {
  if (!isRecord(value) || typeof value.name !== "string") return false
  if (typeof value.value === "string") return true
  const from = value.fromSecret
  return isRecord(from) && typeof from.name === "string" && typeof from.key === "string"
}

export async function declaredBuildEnv(synthPath: string): Promise<readonly BuildEnvEntry[]> {
  const mod: unknown = await import(synthPath)
  const found = isRecord(mod) ? mod[BUILD_ENV_EXPORT] : undefined
  if (!Array.isArray(found)) return []
  return found.filter(isEntry)
}

export interface Unresolved {
  readonly entry: BuildEnvEntry
  readonly why: string
}

export interface Resolved {
  readonly env: BuildEnv
  readonly missing: readonly Unresolved[]
}

export function resolveBuildEnv(
  namespace: string,
  entries: readonly BuildEnvEntry[],
  sha: string
): Resolved {
  const env: { name: string; value: string }[] = [{ name: "NEXT_PUBLIC_BUILD_SHA", value: sha }]
  const missing: Unresolved[] = []
  for (const entry of entries) {
    if ("value" in entry) {
      env.push({ name: entry.name, value: entry.value })
      continue
    }
    const held = secretValue(namespace, entry.fromSecret.name, entry.fromSecret.key)
    if (held === null) {
      missing.push({
        entry,
        why: `secret ${entry.fromSecret.name} in ${namespace} has no readable key ${entry.fromSecret.key}`,
      })
      continue
    }
    env.push({ name: entry.name, value: held })
  }
  return { env, missing }
}

const SYNC_ATTEMPTS = 4

const RETRYABLE = [
  "not our ref",
  "remote end hung up",
  "Could not write new index file",
]

function sleepFor(seconds: number): void {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, seconds * 1000)
}

export function syncTo(target: BuildTarget, pod: string, sha: string, ran: Ran[]): number {
  for (let attempt = 1; attempt <= SYNC_ATTEMPTS; attempt++) {
    const one = exec(
      target,
      pod,
      `U=$(git -C ${REPO_PATH} config --get remote.origin.url); case "$U" in *//*/akasha.git) ;; *) git -C ${REPO_PATH} remote set-url origin "$(printf %s "$U" | sed "s|/[^/]*\\.git$|/akasha.git|")" ;; esac; rm -f ${REPO_PATH}/.git/index.lock; find ${REPO_PATH}/.git/refs ${REPO_PATH}/.git/logs/refs -name "*.lock" -delete 2>/dev/null; trap "rm -f ${REPO_PATH}/.git/index.lock" EXIT INT TERM; cd ${REPO_PATH} && git fetch origin main && git reset --hard ${sha}`
    )
    ran.push(one)
    if (one.code === 0) return 0
    const said = `${one.stdout}${one.stderr}`
    if (!RETRYABLE.some((word) => said.includes(word)) || attempt === SYNC_ATTEMPTS) return one.code
    sleepFor(attempt * 3)
  }
  return 1
}

export interface Built {
  readonly target: BuildTarget
  readonly pod: string
  readonly sha: string
  readonly skipped: boolean
  readonly ran: readonly Ran[]
}

export function buildInPlace(target: BuildTarget, sha: string, env: BuildEnv): Built {
  const ran: Ran[] = []
  const pod = livePod(target)
  if (pod === null) {
    return { target, pod: "", sha, skipped: false, ran }
  }
  const standing = standingIn(target, pod)
  if (standing !== null && alreadyBuilt(standing, sha)) {
    return { target, pod, sha, skipped: true, ran }
  }
  const failed = syncTo(target, pod, sha, ran)
  if (failed !== 0) return { target, pod, sha, skipped: false, ran }

  const build = exec(
    target,
    pod,
    `${envPrefix(env)}sh -c 'cd ${REPO_PATH}/${target.packagePath} && bun install --frozen-lockfile && bun run build && printf %s "${sha}" > ${STAMP_FILE}'`
  )
  ran.push(build)
  if (build.code !== 0) return { target, pod, sha, skipped: false, ran }

  const restart = runKubectl([
    "rollout",
    "restart",
    `deployment/${target.deployment}`,
    "-n",
    target.namespace,
  ])
  ran.push(restart)
  if (restart.code !== 0) return { target, pod, sha, skipped: false, ran }

  ran.push(
    runKubectl([
      "rollout",
      "status",
      `deployment/${target.deployment}`,
      "-n",
      target.namespace,
      "--timeout",
      "5m",
    ])
  )
  return { target, pod, sha, skipped: false, ran }
}
