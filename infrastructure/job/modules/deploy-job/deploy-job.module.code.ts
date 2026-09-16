import { HOLD } from "akasha/code/running/modules/test-overlay/test-overlay.module.code.ts"
import { measured } from "akasha/command/argument/pages/measured.argument.ts"
import { ref } from "akasha/command/argument/pages/ref.argument.ts"
import { deploy } from "akasha/command/pages/deploy/deploy.command.ts"
import {
  type ApiObjectManifest,
  synthOne,
} from "akasha/infrastructure/cluster/k8s-type/modules/cdk8s-synth/cdk8s-synth.module.code.ts"
import { workloadClassMemberSelector } from "akasha/infrastructure/cluster/k8s-type/modules/hostnames/hostnames.module.code.ts"
import {
  ORCHESTRATOR_CACHE_MOUNT_PATH,
  ORCHESTRATOR_CACHE_REPO_PATH,
} from "akasha/infrastructure/cluster/k8s-type/modules/orchestrator-cache-locations/orchestrator-cache-locations.module.code.ts"
import { ci } from "akasha/infrastructure/container-image/dockerfile/built-image/ci/ci.built-image.ts"
import { refFor } from "akasha/infrastructure/container-image/modules/image-ref/image-ref.module.code.ts"
import { deployAccount } from "akasha/infrastructure/job/deploy-account/deploy-account.manifest.ts"
import { JOB_NAMESPACE } from "akasha/infrastructure/job/modules/cluster-running/cluster-running.module.code.ts"
import { dispatcherIn } from "akasha/infrastructure/machine/provisioning/scripts/akasha-launcher/akasha-launcher.shell-script.scripting.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"

const NAMESPACE = JOB_NAMESPACE

const CLASS = "ci"

const JOB_SECRET = "workers-secrets"

const GIT_TOKEN = "GIT_ACCESS_TOKEN"

const AGE_KEY = "SOPS_AGE_KEY"

const ORIGIN =
  `http://x-access-token:$${GIT_TOKEN}` +
  "@git-transport.git.svc.cluster.local:3000/alan/akasha.git"

const TOOLS = "cluster"

const LATEST = "latest"

const ROOM = "LANDING_MIN_FREE_MEMORY_GB"

const ROOM_GB = "1"

export const IN_CLUSTER = "AKASHA_DEPLOY_IN_CLUSTER"

const IN_CLUSTER_SET = "1"

const NAMED = 12

const WORK = "work"

const HELD = "held"

const KEPT_SECONDS = 3600

const DEADLINE_SECONDS = 3600

const UNCONFINED = "Unconfined"

export function jobNameFor(subject: string, commit: string): string {
  return `${deploy.name}-${subject}-${commit.slice(0, NAMED)}`
}

function fetchedFor(commit: string, was: string | null): readonly string[] {
  const at = `git fetch -q --depth 1 origin ${commit}`
  if (was === null || was === commit) return [at]
  return [`git fetch -q --depth 1 origin ${was} || true`, at]
}

export function scriptFor(
  given: string | Reading,
  subject: string,
  commit: string,
  was: string | null
): string {
  return [
    "set -eu",
    `git init -q ${ORCHESTRATOR_CACHE_REPO_PATH}`,
    `cd ${ORCHESTRATOR_CACHE_REPO_PATH}`,
    `git remote add origin ${ORIGIN}`,
    ...fetchedFor(commit, was),
    "git checkout -q FETCH_HEAD",
    "bun install --frozen-lockfile",
    `bun ${dispatcherIn(given)} ${deploy.name} ${subject} ${ref.said} ${commit} ${measured.said}`,
  ].join("\n")
}

export function jobFor(
  given: string | Reading,
  subject: string,
  commit: string,
  was: string | null
): ApiObjectManifest {
  return {
    apiVersion: "batch/v1",
    kind: "Job",
    metadata: { name: jobNameFor(subject, commit), namespace: NAMESPACE },
    spec: {
      backoffLimit: 0,
      activeDeadlineSeconds: DEADLINE_SECONDS,
      ttlSecondsAfterFinished: KEPT_SECONDS,
      template: {
        spec: {
          nodeSelector: workloadClassMemberSelector(CLASS),
          restartPolicy: "Never",
          serviceAccountName: deployAccount.slug,
          securityContext: { seccompProfile: { type: UNCONFINED } },
          volumes: [
            { name: WORK, emptyDir: {} },
            { name: HELD, emptyDir: {} },
          ],
          containers: [
            {
              name: deploy.name,
              image: refFor(`${TOOLS}/${ci.slug}`, LATEST),
              command: ["sh", "-c", scriptFor(given, subject, commit, was)],
              securityContext: { privileged: true },
              env: [
                { name: "HOME", value: ORCHESTRATOR_CACHE_MOUNT_PATH },
                { name: ROOM, value: ROOM_GB },
                { name: IN_CLUSTER, value: IN_CLUSTER_SET },
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
                limits: { cpu: "8", memory: "12Gi" },
              },
            },
          ],
        },
      },
    },
  }
}

export function jobYamlFor(
  given: string | Reading,
  subject: string,
  commit: string,
  was: string | null
): string {
  return synthOne(NAMESPACE, jobNameFor(subject, commit), jobFor(given, subject, commit, was))
}
