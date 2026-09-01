import {
  carries,
  type Plan,
  type Ran,
  runKubectl,
} from "../workload-deploying/workload-deploying.module.code.ts"

const GIT = "git"
const SYNC_CONTAINER = "code-sync"
const REPO_PATH = "/app/repo"
const STAMP = "build/.built-from"
const MAIN_REF = "refs/heads/main"
const FETCHED = "FETCH_HEAD"
const GOING = "\t"
const ROLLOUT_WAIT = "5m"
const SYNC_ATTEMPTS = 4
const SYNC_PAUSE = 3
const TAIL = 6
const A_SHA = /^[0-9a-f]{40}$/
const SYNCS_CODE = new RegExp(`^\\s*-?\\s*name:\\s*${SYNC_CONTAINER}\\s*$`, "m")
const WORKING_DIR_AT = /^[ \t-]*workingDir:[ \t]*(\S+)[ \t]*$/gm
const RETRYABLE = ["not our ref", "remote end hung up", "Could not write new index file"]
const BUILD_ENV_EXPORT = "BUILD_ENV"
const BUILT_FROM_ENV = "NEXT_PUBLIC_BUILD_SHA"
const HIDDEN = "[a secret this deploy read]"

export interface BuildTarget {
  readonly kind: string
  readonly namespace: string
  readonly workload: string
  readonly packagePath: string
}

export function buildTargetOf(plan: Plan): BuildTarget | null {
  const carrying = plan.manifests.find((one) => carries(one, plan.workload))
  if (carrying === undefined) return null
  if (!SYNCS_CODE.test(carrying.yaml)) return null
  for (const found of carrying.yaml.matchAll(WORKING_DIR_AT)) {
    const at = found[1]
    if (at === undefined || !at.startsWith(`${REPO_PATH}/`)) continue
    return {
      kind: plan.workload.kind,
      namespace: plan.workload.namespace,
      workload: plan.workload.name,
      packagePath: at.slice(REPO_PATH.length + 1),
    }
  }
  return null
}

export function runGit(root: string, argv: readonly string[]): Ran {
  const ran = Bun.spawnSync([GIT, "-C", root, ...argv], { stdout: "pipe", stderr: "pipe" })
  return {
    argv: [GIT, ...argv],
    code: ran.exitCode,
    stdout: new TextDecoder().decode(ran.stdout),
    stderr: new TextDecoder().decode(ran.stderr),
  }
}

export function saidBy(ran: Ran): string {
  const said = `${ran.stdout}${ran.stderr}`.trim().split("\n")
  return said.slice(-TAIL).join("; ")
}

export function headOf(root: string): string | null {
  const ran = runGit(root, ["rev-parse", "HEAD"])
  if (ran.code !== 0) return null
  const held = ran.stdout.trim()
  return A_SHA.test(held) ? held : null
}

export type Carried = { readonly carried: boolean } | { readonly why: string }

export function carriedByOrigin(root: string, sha: string): Carried {
  const fetched = runGit(root, ["fetch", "origin", "main"])
  if (fetched.code !== 0) {
    return { why: `git fetch origin main exited ${fetched.code}: ${saidBy(fetched)}` }
  }
  return { carried: runGit(root, ["merge-base", "--is-ancestor", sha, FETCHED]).code === 0 }
}

export function pushToOrigin(root: string, sha: string): Ran {
  return runGit(root, ["push", "origin", `${sha}:${MAIN_REF}`])
}

export function livestOf(said: string): string | null {
  for (const line of said.split("\n")) {
    const [name, going] = line.split(GOING)
    if (name === undefined || name.trim() === "") continue
    if ((going ?? "").trim() !== "") continue
    return name.trim()
  }
  return null
}

export function livePod(target: BuildTarget): string | null {
  const ran = runKubectl([
    "get",
    "pods",
    "-n",
    target.namespace,
    "-l",
    `app.kubernetes.io/name=${target.workload}`,
    "--field-selector=status.phase=Running",
    "-o",
    `jsonpath={range .items[*]}{.metadata.name}{"${GOING}"}{.metadata.deletionTimestamp}{"\\n"}{end}`,
  ])
  if (ran.code !== 0) return null
  return livestOf(ran.stdout)
}

function inSync(target: BuildTarget, pod: string, script: string): Ran {
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

export interface InPod {
  readonly head: string
  readonly builtFrom: string
}

export function inPod(target: BuildTarget, pod: string): InPod | null {
  const ran = inSync(
    target,
    pod,
    [
      `cd ${REPO_PATH} && git rev-parse HEAD`,
      `cat ${REPO_PATH}/${target.packagePath}/${STAMP} 2>/dev/null || echo ""`,
    ].join("; ")
  )
  if (ran.code !== 0) return null
  const lines = ran.stdout.split("\n")
  return { head: (lines[0] ?? "").trim(), builtFrom: (lines[1] ?? "").trim() }
}

export function alreadyBuilt(held: InPod | null, sha: string): boolean {
  return held !== null && held.builtFrom === sha
}

export function syncScript(sha: string): string {
  return [
    `rm -f ${REPO_PATH}/.git/index.lock`,
    `cd ${REPO_PATH}`,
    "git fetch origin main",
    `git reset --hard ${sha}`,
  ].join(" && ")
}

export type BuildEnvEntry =
  | { readonly name: string; readonly value: string }
  | { readonly name: string; readonly fromSecret: { readonly name: string; readonly key: string } }

export type BuildEnv = readonly { readonly name: string; readonly value: string }[]

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

function isEntry(value: unknown): value is BuildEnvEntry {
  if (!isRecord(value) || typeof value.name !== "string") return false
  if (typeof value.value === "string") return true
  const from = value.fromSecret
  return isRecord(from) && typeof from.name === "string" && typeof from.key === "string"
}

export function entriesIn(loaded: unknown): readonly BuildEnvEntry[] {
  const found = isRecord(loaded) ? loaded[BUILD_ENV_EXPORT] : undefined
  return Array.isArray(found) ? found.filter(isEntry) : []
}

export async function declaredBuildEnv(at: string): Promise<readonly BuildEnvEntry[]> {
  try {
    return entriesIn((await import(at)) as unknown)
  } catch {
    return []
  }
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
  const held = ran.stdout.trim()
  if (held === "") return null
  return Buffer.from(held, "base64").toString("utf8")
}

export interface Resolved {
  readonly env: BuildEnv
  readonly hidden: readonly string[]
  readonly missing: readonly string[]
}

export function resolveBuildEnv(
  namespace: string,
  entries: readonly BuildEnvEntry[],
  sha: string
): Resolved {
  const env: { name: string; value: string }[] = [{ name: BUILT_FROM_ENV, value: sha }]
  const hidden: string[] = []
  const missing: string[] = []
  for (const entry of entries) {
    if ("value" in entry) {
      env.push({ name: entry.name, value: entry.value })
      continue
    }
    const held = secretValue(namespace, entry.fromSecret.name, entry.fromSecret.key)
    if (held === null) {
      missing.push(
        `${entry.name} is read from the key ${entry.fromSecret.key} of the secret ${entry.fromSecret.name} in ${namespace}, and nothing readable stands there`
      )
      continue
    }
    env.push({ name: entry.name, value: held })
    hidden.push(held)
  }
  return { env, hidden, missing }
}

export const NOTHING_SET: Resolved = { env: [], hidden: [], missing: [] }

export function hiding(said: string, hidden: readonly string[]): string {
  let held = said
  for (const one of hidden) {
    if (one === "") continue
    held = held.split(one).join(HIDDEN)
  }
  return held
}

export function quoted(said: string): string {
  return `'${said.split("'").join(`'\\''`)}'`
}

export function envPrefix(env: BuildEnv): string {
  if (env.length === 0) return ""
  return `env ${env.map((one) => `${one.name}=${quoted(one.value)}`).join(" ")} `
}

export function buildScript(target: BuildTarget, sha: string, env: BuildEnv = []): string {
  const script = [
    `cd ${REPO_PATH}`,
    "bun install --frozen-lockfile",
    `cd ${REPO_PATH}/${target.packagePath}`,
    "bun run build",
    `printf %s ${sha} > ${STAMP}`,
  ].join(" && ")
  return `${envPrefix(env)}sh -c ${quoted(script)}`
}

function sleepFor(seconds: number): undefined {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, seconds * 1000)
}

export function syncTo(target: BuildTarget, pod: string, sha: string, ran: Ran[]): number {
  for (let attempt = 1; attempt <= SYNC_ATTEMPTS; attempt++) {
    const one = inSync(target, pod, syncScript(sha))
    ran.push(one)
    if (one.code === 0) return 0
    const said = `${one.stdout}${one.stderr}`
    if (!RETRYABLE.some((word) => said.includes(word)) || attempt === SYNC_ATTEMPTS) return one.code
    sleepFor(attempt * SYNC_PAUSE)
  }
  return 1
}

export interface Built {
  readonly pod: string
  readonly ran: readonly Ran[]
  readonly why: string | null
}

export function buildInPod(
  target: BuildTarget,
  sha: string,
  resolved: Resolved = NOTHING_SET
): Built {
  const ran: Ran[] = []
  const pod = livePod(target)
  if (pod === null) {
    return {
      pod: "",
      ran,
      why: `no running pod carries ${target.workload} in ${target.namespace}, so nothing holds a build`,
    }
  }
  if (syncTo(target, pod, sha, ran) !== 0) {
    const last = ran[ran.length - 1] as Ran
    return { pod, ran, why: `${pod} would not check out ${sha}: ${saidBy(last)}` }
  }
  const built = inSync(target, pod, buildScript(target, sha, resolved.env))
  ran.push(built)
  if (built.code !== 0) {
    const why = `${target.packagePath} would not build in ${pod}: ${saidBy(built)}`
    return { pod, ran, why: hiding(why, resolved.hidden) }
  }
  const named = `${target.kind.toLowerCase()}/${target.workload}`
  const restart = runKubectl(["rollout", "restart", named, "-n", target.namespace])
  ran.push(restart)
  if (restart.code !== 0) {
    return { pod, ran, why: `${named} would not restart onto the build: ${saidBy(restart)}` }
  }
  const waited = runKubectl([
    "rollout",
    "status",
    named,
    "-n",
    target.namespace,
    "--timeout",
    ROLLOUT_WAIT,
  ])
  ran.push(waited)
  if (waited.code !== 0) {
    return { pod, ran, why: `${named} did not come up on the build: ${saidBy(waited)}` }
  }
  return { pod, ran, why: null }
}
