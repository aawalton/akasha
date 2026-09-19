import { HOLD } from "akasha/code/running/modules/test-overlay/test-overlay.module.code.ts"
import { type PushOutcome, pushBranch } from "akasha/git/modules/pushing/git-pushing.module.code.ts"
import {
  type ApiObjectManifest,
  synthOne,
} from "akasha/infrastructure/cluster/k8s-type/modules/cdk8s-synth/cdk8s-synth.module.code.ts"
import {
  HOSTNAME_KEY,
  workloadClassMemberSelector,
} from "akasha/infrastructure/cluster/k8s-type/modules/hostnames/hostnames.module.code.ts"
import {
  ORCHESTRATOR_CACHE_MOUNT_PATH,
  ORCHESTRATOR_CACHE_REPO_PATH,
} from "akasha/infrastructure/cluster/k8s-type/modules/orchestrator-cache-locations/orchestrator-cache-locations.module.code.ts"
import { ci } from "akasha/infrastructure/container-image/dockerfile/built-image/ci/ci.built-image.ts"
import { publishedFor } from "akasha/infrastructure/container-image/modules/image-publishing/image-publishing.module.code.ts"
import { refOf } from "akasha/infrastructure/container-image/modules/image-ref/image-ref.module.code.ts"
import { deployAccount } from "akasha/infrastructure/job/deploy-account/deploy-account.manifest.ts"
import {
  IN_CLUSTER,
  IN_CLUSTER_SET,
  NODE_NAME,
} from "akasha/infrastructure/job/modules/run-in-cluster/run-in-cluster.module.code.ts"
import {
  type Carried,
  carriedByOrigin,
} from "akasha/infrastructure/service/cluster/modules/web-app-building/web-app-building.module.code.ts"
import {
  type Plan,
  type Ran,
  runKubectl,
  runKubectlOn,
} from "akasha/infrastructure/service/cluster/modules/workload-deploying/workload-deploying.module.code.ts"
import { placeSecrets } from "akasha/infrastructure/service/secret/modules/placing/secret-placing.module.code.ts"

export const JOB_NAMESPACE = "workers"

export const WAITED_ROUNDS = 180

const WAITED_ONCE = "10s"

const AT_ONCE = "1s"

const COMPLETE = "condition=Complete"

const FAILED = "condition=Failed"

const EVERY_LINE = "--tail=-1"

const JOB = "Job"

const CLASS = "ci"

const FASTEST = "node-06"

const MOST = 100

const JOB_SECRET = "workers-secrets"

const GIT_TOKEN = "GIT_ACCESS_TOKEN"

const AGE_KEY = "SOPS_AGE_KEY"

const ORIGIN =
  `http://x-access-token:$${GIT_TOKEN}` +
  "@git-transport.git.svc.cluster.local:3000/alan/akasha.git"

const ROOM = "LANDING_MIN_FREE_MEMORY_GB"

const ROOM_GB = "1"

export const NAMED = 12

const WORK = "work"

const HELD = "held"

const KEPT_SECONDS = 3600

const DEADLINE_SECONDS = 3600

const UNCONFINED = "Unconfined"

const ON_NODE = "spec.nodeName"

function fetchedFor(commit: string, was: string | null): readonly string[] {
  const at = `git fetch -q --depth 1 origin ${commit}`
  if (was === null || was === commit) return [at]
  return [`git fetch -q --depth 1 origin ${was} || true`, at]
}

export function checkedOut(commit: string, was: string | null): readonly string[] {
  return [
    "set -eu",
    `git init -q ${ORCHESTRATOR_CACHE_REPO_PATH}`,
    `cd ${ORCHESTRATOR_CACHE_REPO_PATH}`,
    `git remote add origin ${ORIGIN}`,
    ...fetchedFor(commit, was),
    "git checkout -q FETCH_HEAD",
    "bun install --frozen-lockfile",
  ]
}

function jobFor(name: string, script: string): ApiObjectManifest {
  return {
    apiVersion: "batch/v1",
    kind: JOB,
    metadata: { name, namespace: JOB_NAMESPACE },
    spec: {
      backoffLimit: 0,
      activeDeadlineSeconds: DEADLINE_SECONDS,
      ttlSecondsAfterFinished: KEPT_SECONDS,
      template: {
        spec: {
          nodeSelector: workloadClassMemberSelector(CLASS),
          affinity: {
            nodeAffinity: {
              preferredDuringSchedulingIgnoredDuringExecution: [
                {
                  weight: MOST,
                  preference: {
                    matchExpressions: [{ key: HOSTNAME_KEY, operator: "In", values: [FASTEST] }],
                  },
                },
              ],
            },
          },
          restartPolicy: "Never",
          serviceAccountName: deployAccount.slug,
          securityContext: { seccompProfile: { type: UNCONFINED } },
          volumes: [
            { name: WORK, emptyDir: {} },
            { name: HELD, emptyDir: {} },
          ],
          containers: [
            {
              name: JOB.toLowerCase(),
              image: refOf(ci),
              command: ["sh", "-c", script],
              securityContext: { privileged: true },
              env: [
                { name: "HOME", value: ORCHESTRATOR_CACHE_MOUNT_PATH },
                { name: ROOM, value: ROOM_GB },
                { name: IN_CLUSTER, value: IN_CLUSTER_SET },
                { name: NODE_NAME, valueFrom: { fieldRef: { fieldPath: ON_NODE } } },
                {
                  name: GIT_TOKEN,
                  valueFrom: { secretKeyRef: { name: JOB_SECRET, key: GIT_TOKEN } },
                },
                {
                  name: AGE_KEY,
                  valueFrom: { secretKeyRef: { name: JOB_SECRET, key: AGE_KEY } },
                },
              ],
              volumeMounts: [
                { name: WORK, mountPath: ORCHESTRATOR_CACHE_MOUNT_PATH },
                { name: HELD, mountPath: HOLD },
              ],
              resources: {
                requests: { cpu: "2", memory: "6Gi" },
                limits: { cpu: "16", memory: "24Gi" },
              },
            },
          ],
        },
      },
    },
  }
}

export function jobYamlFor(name: string, script: string): string {
  return synthOne(JOB_NAMESPACE, name, jobFor(name, script))
}

export type Running = (argv: readonly string[], text: string | null) => Ran

export type Carrying = (root: string, commit: string) => Carried

export type Pushing = (root: string) => PushOutcome

export type Ended = { readonly said: readonly string[] } | { readonly why: string }

export type Fate = "complete" | "failed" | "running"

export function applyArgv(): readonly string[] {
  return ["apply", "-f", "-"]
}

function planFor(name: string, yaml: string): Plan {
  return {
    workload: { kind: JOB, name, namespace: JOB_NAMESPACE },
    synthPath: name,
    manifests: [
      { name, path: name, yaml, kind: JOB, resourceName: name, namespace: JOB_NAMESPACE },
    ],
  }
}

export function waitArgv(name: string, forWhat: string, waited: string): readonly string[] {
  return ["wait", "-n", JOB_NAMESPACE, `job/${name}`, `--for=${forWhat}`, `--timeout=${waited}`]
}

export function logsArgv(name: string): readonly string[] {
  return ["logs", "-n", JOB_NAMESPACE, `job/${name}`, EVERY_LINE]
}

const ranBy: Running = (argv, text) => (text === null ? runKubectl(argv) : runKubectlOn(argv, text))

export function endedBy(fate: Fate, lines: Ran, name: string): Ended {
  const said = lines.stdout.trim() === "" ? [] : lines.stdout.trim().split("\n")
  if (fate === "complete") return { said }
  if (fate === "failed") return { why: [`the job ${name} failed`, ...said].join("\n") }
  return { why: `the job ${name} had not ended, so its lines are all that is known` }
}

export function fateOf(running: Running, name: string, rounds: number): Fate {
  for (let round = 0; round < rounds; round += 1) {
    if (running(waitArgv(name, COMPLETE, WAITED_ONCE), null).code === 0) return "complete"
    if (running(waitArgv(name, FAILED, AT_ONCE), null).code === 0) return "failed"
  }
  return "running"
}

export function carriedAt(
  root: string,
  commit: string,
  carrying: Carrying,
  pushing: Pushing
): string | null {
  const carried = carrying(root, commit)
  if ("why" in carried) return carried.why
  if (carried.carried) return null
  const pushed = pushing(root)
  const again = carrying(root, commit)
  if ("why" in again) return again.why
  if (again.carried) return null
  if (pushed.failed) return `origin does not carry ${commit} and ${pushed.line}`
  return `origin does not carry ${commit}, so no job in the cluster can read it`
}

export async function imageHeldFor(yaml: string, root: string): Promise<string | null> {
  const done: string[] = []
  try {
    await publishedFor([yaml], root, done)
    return null
  } catch (thrown) {
    const said = thrown instanceof Error ? thrown.message : String(thrown)
    return [`the image this job runs in is not in the registry: ${said}`, ...done].join("\n")
  }
}

export async function jobRan(
  root: string,
  commit: string,
  name: string,
  yaml: string,
  rounds: number = WAITED_ROUNDS,
  running: Running = ranBy,
  carrying: Carrying = carriedByOrigin,
  pushing: Pushing = pushBranch
): Promise<Ended> {
  const why = carriedAt(root, commit, carrying, pushing)
  if (why !== null) return { why }
  const unbuilt = await imageHeldFor(yaml, root)
  if (unbuilt !== null) return { why: unbuilt }
  const placing = placeSecrets(root, planFor(name, yaml))
  if (placing.unplaced.length > 0) {
    const short = placing.unplaced.map((one) => `${one.name}/${one.key}`).join(", ")
    return { why: `no secret page places ${short}, so the job would read no repository` }
  }
  const put = running(applyArgv(), yaml)
  if (put.code !== 0) {
    return { why: `the job ${name} would not go up: ${put.stderr.trim()}` }
  }
  return endedBy(fateOf(running, name, rounds), running(logsArgv(name), null), name)
}
