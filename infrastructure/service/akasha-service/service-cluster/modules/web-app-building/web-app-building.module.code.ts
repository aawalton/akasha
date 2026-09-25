import { mkdirSync, mkdtempSync, rmSync } from "node:fs"
import { dirname, join } from "node:path"
import { quoted } from "akasha/code/shell/modules/quoting/quoting.module.code.ts"
import { ran as running } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { firstCapture } from "akasha/code/type/narrowing/modules/first-capture/first-capture.module.code.ts"
import { isObjectRecord } from "akasha/code/type/narrowing/modules/is-object-record/is-object-record.module.code.ts"
import {
  BUILD_STAMP,
  SERVED_BUILD_AT,
  webCheckoutAndBuild,
} from "akasha/infrastructure/cluster/k8s-type/modules/orchestrator-cache/orchestrator-cache.module.code.ts"
import {
  carries,
  type Plan,
  type Ran,
  rolloutWaitFor,
  runKubectl,
  runKubectlAwaited,
} from "akasha/infrastructure/service/akasha-service/service-cluster/modules/workload-deploying/workload-deploying.module.code.ts"
import { valueByPath } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  recordsIn,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const GIT = "git"
const BUN = "bun"
const TAR = "tar"
const SCRATCH_AT = "/var/tmp"
const GATE_AT = "akasha-install-gate-"
const TREE = "tree"
export const TRACKED = [":(glob)**/package.json", "package.json", "bun.lock"]
const INSTALL = ["install", "--frozen-lockfile", "--dry-run"]
const UNFOUND = /Workspace not found "([^"]*)"/
const SYNC_CONTAINER = "code-sync"
const REPO_PATH = "/app/repo"
const FETCHED = "FETCH_HEAD"
const GOING = "\t"
const SYNC_ATTEMPTS = 4
const SYNC_PAUSE = 3
const TAIL = 6
const A_FRAME = /^\s*at\s/
const SYNCS_CODE = new RegExp(`^\\s*-?\\s*name:\\s*${SYNC_CONTAINER}\\s*$`, "m")
const WORKING_DIR_AT = /^[ \t-]*workingDir:[ \t]*(\S+)[ \t]*$/gm
const RETRYABLE = ["not our ref", "remote end hung up", "Could not write new index file"]
const BUILD_ENV = "buildEnv"
const ENTRY_NAME = "name"
const ENTRY_VALUE = "value"
const FROM_SECRET = "fromSecret"
const SECRET_NAME = "resourceName"
const SECRET_KEY = "resourceKey"
const BUILT_FROM_ENV = "NEXT_PUBLIC_BUILD_SHA"
const BUILT_FROM_VITE_ENV = "VITE_BUILD_SHA"
const HIDDEN = "[a secret this deploy read]"

export interface BuildTarget {
  readonly kind: string
  readonly namespace: string
  readonly workload: string
  readonly packagePath: string
}

export function packageIn(yaml: string): string | null {
  for (const found of yaml.matchAll(WORKING_DIR_AT)) {
    const at = found[1]
    if (at === undefined || !at.startsWith(`${REPO_PATH}/`)) continue
    return at.slice(REPO_PATH.length + 1)
  }
  return null
}

export function buildTargetOf(plan: Plan): BuildTarget | null {
  const workload = plan.workload
  if (workload === null) return null
  const carrying = plan.manifests.find((one) => carries(one, workload))
  if (carrying === undefined) return null
  if (!SYNCS_CODE.test(carrying.yaml)) return null
  const packagePath = packageIn(carrying.yaml)
  if (packagePath === null) return null
  return {
    kind: workload.kind,
    namespace: workload.namespace,
    workload: workload.name,
    packagePath,
  }
}

function runGit(root: string, argv: readonly string[]): Ran {
  const done = running([GIT, "-C", root, ...argv])
  return { argv: [GIT, ...argv], code: done.code, stdout: done.out, stderr: done.err }
}

export function saidBy(ran: Ran): string {
  const said = `${ran.stdout}${ran.stderr}`.trim().split("\n")
  const kept = said.filter((line) => !A_FRAME.test(line))
  return (kept.length === 0 ? said : kept).slice(-TAIL).join("; ")
}

export type Carried = { readonly carried: boolean } | { readonly why: string }

export function carriedByOrigin(root: string, sha: string): Carried {
  const fetched = runGit(root, ["fetch", "origin", "main"])
  if (fetched.code !== 0) {
    return { why: `git fetch origin main exited ${fetched.code}: ${saidBy(fetched)}` }
  }
  return { carried: runGit(root, ["merge-base", "--is-ancestor", sha, FETCHED]).code === 0 }
}

function ranOf(argv: readonly string[], at: string): Ran {
  const done = running([...argv], { cwd: at })
  return { argv: [...argv], code: done.code, stdout: done.out, stderr: done.err }
}

export function unfoundIn(said: string): string | null {
  return firstCapture(UNFOUND.exec(said))
}

export function whyUninstallable(sha: string, ran: Ran): string | null {
  if (ran.code === 0) return null
  const unfound = unfoundIn(`${ran.stdout}${ran.stderr}`)
  if (unfound === null) {
    return `the manifests tracked at ${sha} would not install, so the build in the pod would stop: ${saidBy(ran)}`
  }
  const named = JSON.stringify(unfound)
  return `the tree at ${sha} names the workspace ${named} and tracks no manifest for it, so the build in the pod would stop at Workspace not found ${named}`
}

export type Installable = { readonly installs: true } | { readonly why: string }

export function readOut(
  root: string,
  sha: string,
  into: string,
  paths: readonly string[]
): string | null {
  const archive = `${into}.tar`
  const took = runGit(root, ["archive", "--format=tar", "-o", archive, sha, "--", ...paths])
  if (took.code !== 0) return `could not be read out: ${saidBy(took)}`
  mkdirSync(into, { recursive: true })
  const spread = ranOf([TAR, "-xf", archive, "-C", into], dirname(into))
  rmSync(archive, { force: true })
  if (spread.code !== 0) return `could not be laid out: ${saidBy(spread)}`
  return null
}

export function installableAt(root: string, sha: string): Installable {
  const held = mkdtempSync(join(SCRATCH_AT, GATE_AT))
  try {
    const tree = join(held, TREE)
    const unread = readOut(root, sha, tree, TRACKED)
    if (unread !== null) return { why: `the manifests tracked at ${sha} ${unread}` }
    const why = whyUninstallable(sha, ranOf([BUN, ...INSTALL], tree))
    return why === null ? { installs: true } : { why }
  } finally {
    rmSync(held, { recursive: true, force: true })
  }
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
      `cat ${REPO_PATH}/${target.packagePath}/${SERVED_BUILD_AT}/${BUILD_STAMP} 2>/dev/null || echo ""`,
    ].join("; ")
  )
  if (ran.code !== 0) return null
  const lines = ran.stdout.split("\n")
  return { head: (lines[0] ?? "").trim(), builtFrom: (lines[1] ?? "").trim() }
}

export function alreadyBuilt(held: InPod | null, sha: string): boolean {
  return held !== null && held.builtFrom === sha
}

export type BuildEnvEntry =
  | { readonly name: string; readonly value: string }
  | { readonly name: string; readonly fromSecret: { readonly name: string; readonly key: string } }

export type BuildEnv = readonly { readonly name: string; readonly value: string }[]

function entryIn(stated: Value): BuildEnvEntry | null {
  const name = textAt(stated, ENTRY_NAME)
  if (name === null) return null
  const value = textAt(stated, ENTRY_VALUE)
  if (value !== null) return { name, value }
  const from = stated[FROM_SECRET]
  if (!isObjectRecord(from)) return null
  const secret = textAt(from, SECRET_NAME)
  const key = textAt(from, SECRET_KEY)
  if (secret === null || key === null) return null
  return { name, fromSecret: { name: secret, key } }
}

export function entriesIn(stated: unknown): readonly BuildEnvEntry[] {
  const found: BuildEnvEntry[] = []
  for (const one of recordsIn(stated)) {
    const entry = entryIn(one)
    if (entry !== null) found.push(entry)
  }
  return found
}

export function declaredBuildEnv(at: string, manifestPath: string): readonly BuildEnvEntry[] {
  const stated = valueByPath(at, manifestPath)
  return stated === null ? [] : entriesIn(stated[BUILD_ENV])
}

function secretValue(namespace: string, secret: string, key: string): string | null {
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
  const env: { name: string; value: string }[] = [
    { name: BUILT_FROM_ENV, value: sha },
    { name: BUILT_FROM_VITE_ENV, value: sha },
  ]
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
        `${entry.name} is read from the key ${entry.fromSecret.key} of the secret ${entry.fromSecret.name} in ${namespace}, and nothing readable is there`
      )
      continue
    }
    env.push({ name: entry.name, value: held })
    hidden.push(held)
  }
  return { env, hidden, missing }
}

const NOTHING_SET: Resolved = { env: [], hidden: [], missing: [] }

export function hiding(said: string, hidden: readonly string[]): string {
  let held = said
  for (const one of hidden) {
    if (one === "") continue
    held = held.split(one).join(HIDDEN)
  }
  return held
}

export function envPrefix(env: BuildEnv): string {
  if (env.length === 0) return ""
  return `env ${env.map((one) => `${one.name}=${quoted(one.value)}`).join(" ")} `
}

export function buildScript(target: BuildTarget, sha: string, env: BuildEnv = []): string {
  return `${envPrefix(env)}sh -c ${quoted(webCheckoutAndBuild(target.packagePath, sha))}`
}

function passes(one: Ran): boolean {
  const said = `${one.stdout}${one.stderr}`
  return RETRYABLE.some((word) => said.includes(word))
}

function inSyncAwaited(target: BuildTarget, pod: string, script: string): Promise<Ran> {
  return runKubectlAwaited([
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

async function builtThere(
  target: BuildTarget,
  pod: string,
  script: string,
  ran: Ran[]
): Promise<Ran> {
  let one = await inSyncAwaited(target, pod, script)
  ran.push(one)
  for (let attempt = 1; attempt < SYNC_ATTEMPTS && one.code !== 0 && passes(one); attempt++) {
    await Bun.sleep(attempt * SYNC_PAUSE * 1000)
    one = await inSyncAwaited(target, pod, script)
    ran.push(one)
  }
  return one
}

export interface Built {
  readonly pod: string
  readonly ran: readonly Ran[]
  readonly why: string | null
}

export async function buildInPod(
  target: BuildTarget,
  sha: string,
  resolved: Resolved = NOTHING_SET,
  restarting = true
): Promise<Built> {
  const ran: Ran[] = []
  const pod = livePod(target)
  if (pod === null) {
    return {
      pod: "",
      ran,
      why: `no running pod carries ${target.workload} in ${target.namespace}, so nothing holds a build`,
    }
  }
  const built = await builtThere(target, pod, buildScript(target, sha, resolved.env), ran)
  if (built.code !== 0) {
    const why = `${target.packagePath} would not check out ${sha} and build in ${pod}: ${saidBy(built)}`
    return { pod, ran, why: hiding(why, resolved.hidden) }
  }
  if (!restarting) return { pod, ran, why: null }
  const named = `${target.kind.toLowerCase()}/${target.workload}`
  const restart = await runKubectlAwaited(["rollout", "restart", named, "-n", target.namespace])
  ran.push(restart)
  if (restart.code !== 0) {
    return { pod, ran, why: `${named} would not restart onto the build: ${saidBy(restart)}` }
  }
  const waited = await runKubectlAwaited([
    "rollout",
    "status",
    named,
    "-n",
    target.namespace,
    "--timeout",
    rolloutWaitFor(target.kind),
  ])
  ran.push(waited)
  if (waited.code !== 0) {
    return { pod, ran, why: `${named} did not come up on the build: ${saidBy(waited)}` }
  }
  return { pod, ran, why: null }
}
