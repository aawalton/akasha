import { parseAllDocuments } from "yaml"
import type { Plan } from "../deploy/deploy.ts"
import { type Ran, runKubectl } from "../kubectl/kubectl.ts"

/**
 * The container a build is exec'd into. It sleeps, and that is what it is for: it holds a shell
 * open beside the repository the app runs from, so a build can be run in place.
 */
const SYNC_CONTAINER = "code-sync"

const REPO_PATH = "/app/repo"

/** Written last in the build chain, so it stands only where a build finished. */
const STAMP_FILE = "build/.build-sha"

const ARTIFACT = "build/server/index.js"

export interface BuildTarget {
  readonly namespace: string
  readonly deployment: string
  readonly packagePath: string
}

export type BuildEnv = readonly { readonly name: string; readonly value: string }[]

/**
 * One value a service's build needs, either written down or named in the namespace's secret.
 *
 * EVERY ENTRY IS DECLARED, WITH NO DEFAULTS ADDED HERE. A build environment assembled partly from
 * a list on the page and partly from a default applied behind it reads as the list, and the
 * difference only shows up as a bundle built against the wrong backend. What a service builds with
 * is what its own attachment says and nothing besides.
 */
export type BuildEnvEntry =
  | { readonly name: string; readonly value: string }
  | { readonly name: string; readonly fromSecret: { readonly name: string; readonly key: string } }

/** The name a cluster service's attachment exports its build environment under. */
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

/**
 * Where in the repository this service's build is run, read off the workload that will be applied.
 *
 * THE PATH IS TAKEN FROM THE MANIFEST RATHER THAN DECLARED BESIDE IT. A build path written on the
 * page could disagree with the `workingDir` the pod actually starts in, and the disagreement would
 * show up as a build made correctly in a directory nothing runs from. What the pod runs in cannot
 * be wrong about what the pod runs in.
 *
 * A SERVICE THAT DOES NOT BUILD IN ITS POD ANSWERS NOTHING. The two marks of one that does are a
 * sleeping sync container to exec into and a working directory inside the checkout; a workload
 * carrying neither is deployed by applying its manifests and no more.
 */
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

/**
 * The one Running pod of this workload, or nothing.
 *
 * A BUILD GOES INTO A POD RATHER THAN INTO A WORKLOAD, and the cache it writes is that pod's node's
 * alone, so which pod answered is part of what happened and is reported rather than assumed.
 */
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

/**
 * Whether this pod is already serving a build made from this commit.
 *
 * ALL THREE ARE ASKED, NOT ONE. A matching HEAD says the source moved, not that anything was built
 * from it; a present artifact says something was built, not from what. Only the stamp ties a build
 * to a commit, and it is written last in the build chain, so a build that failed leaves none and
 * this answers false rather than claiming the work is done.
 */
export function alreadyBuilt(standing: Standing, sha: string): boolean {
  return standing.head === sha && standing.artifact && standing.stamp === sha
}

function envPrefix(env: BuildEnv): string {
  if (env.length === 0) return ""
  const parts = env.map((one) => `${one.name}=${JSON.stringify(one.value)}`)
  return `env ${parts.join(" ")} `
}

/**
 * The value of one key of a namespace's secret, or nothing where it cannot be read.
 */
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

/**
 * What this service's synth says its build needs, or nothing where it says nothing.
 *
 * THE ATTACHMENT IS ASKED RATHER THAN THE WORKFLOW THAT USED TO RUN THE BUILD. A service's build
 * environment belongs beside the `workingDir` it already sets, so one file answers for how the
 * service is built as well as how it runs.
 */
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

/**
 * The build environment with every secret read, and whatever could not be read named.
 *
 * A MISSING VALUE STOPS THE BUILD RATHER THAN THINNING IT. A bundle built without a key it needed
 * starts, serves, and is wrong in the browser, so a build with an unresolved entry is refused by
 * the caller instead of run with the entry dropped.
 *
 * `NEXT_PUBLIC_BUILD_SHA` is not declared anywhere: it is the commit being deployed, so it is added
 * here rather than written on each service where it could disagree.
 */
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

export interface Built {
  readonly target: BuildTarget
  readonly pod: string
  readonly sha: string
  readonly skipped: boolean
  readonly ran: readonly Ran[]
}

/**
 * Move this service's pod to `sha`, build in place, and restart it.
 *
 * THE SOURCE IS ADVANCED TO A COMMIT RATHER THAN TO A BRANCH. The init container resets to
 * `origin/main`, which is wherever main stands when the pod starts; a deploy is of one commit, and
 * fetching that commit by name is what makes the build and the manifests the same change.
 *
 * NOTHING IS RECORDED BY THIS. A caller that files an answer against a mark files it after this
 * returns and only where every step exited 0, so a failed build leaves no record claiming success.
 */
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
  const sync = exec(
    target,
    pod,
    `trap "rm -f ${REPO_PATH}/.git/index.lock" EXIT INT TERM; cd ${REPO_PATH} && git fetch origin ${sha} && git reset --hard ${sha}`
  )
  ran.push(sync)
  if (sync.code !== 0) return { target, pod, sha, skipped: false, ran }

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
