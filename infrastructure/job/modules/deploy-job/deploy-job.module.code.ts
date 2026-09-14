import { ref } from "akasha/commands/arguments/pages/ref.argument.ts"
import { deploy } from "akasha/commands/pages/deploy/deploy.command.ts"
import { index } from "akasha/commands/pages/index/index.namespace.ts"
import { indexRefresh } from "akasha/commands/pages/index/refresh/index-refresh.command.ts"
import {
  type ApiObjectManifest,
  synthOne,
} from "akasha/infrastructure/cluster/k8s-types/modules/cdk8s-synth/cdk8s-synth.module.code.ts"
import { workloadClassMemberSelector } from "akasha/infrastructure/cluster/k8s-types/modules/hostnames/hostnames.module.code.ts"
import {
  ORCHESTRATOR_CACHE_MOUNT_PATH,
  ORCHESTRATOR_CACHE_REPO_PATH,
} from "akasha/infrastructure/cluster/k8s-types/modules/orchestrator-cache-locations/orchestrator-cache-locations.module.code.ts"
import { ci } from "akasha/infrastructure/container-image/dockerfiles/built-images/ci/ci.built-image.ts"
import { refFor } from "akasha/infrastructure/container-image/modules/image-ref/image-ref.module.code.ts"
import { dispatcherIn } from "akasha/infrastructure/machines/provisioning/scripts/akasha-launcher/akasha-launcher.shell-script.scripting.code.ts"
import type { Reading } from "akasha/pages/indexes/modules/shape/index-shape.module.code.ts"

export const JOB_NAMESPACE = "workers"

const NAMESPACE = JOB_NAMESPACE

const CLASS = "ci"

export const JOB_SECRET = "workers-secrets"

export const GIT_TOKEN = "GIT_ACCESS_TOKEN"

const ORIGIN =
  `http://x-access-token:$${GIT_TOKEN}` +
  "@git-transport.git.svc.cluster.local:3000/alan/akasha.git"

const TOOLS = "cluster"

const LATEST = "latest"

const ROOM = "LANDING_MIN_FREE_MEMORY_GB"

const ROOM_GB = "1"

const NAMED = 12

const WORK = "work"

const KEPT_SECONDS = 3600

export function jobNameFor(subject: string, commit: string): string {
  return `${deploy.name}-${subject}-${commit.slice(0, NAMED)}`
}

export function scriptFor(given: string | Reading, subject: string, commit: string): string {
  return [
    "set -eu",
    `git init -q ${ORCHESTRATOR_CACHE_REPO_PATH}`,
    `cd ${ORCHESTRATOR_CACHE_REPO_PATH}`,
    `git remote add origin ${ORIGIN}`,
    `git fetch -q --depth 1 origin ${commit}`,
    "git checkout -q FETCH_HEAD",
    "bun install --frozen-lockfile",
    `bun ${dispatcherIn(given)} ${index.name} ${indexRefresh.name}`,
    `bun ${dispatcherIn(given)} ${deploy.name} ${subject} ${ref.said} ${commit}`,
  ].join("\n")
}

export function jobFor(
  given: string | Reading,
  subject: string,
  commit: string
): ApiObjectManifest {
  return {
    apiVersion: "batch/v1",
    kind: "Job",
    metadata: { name: jobNameFor(subject, commit), namespace: NAMESPACE },
    spec: {
      backoffLimit: 0,
      ttlSecondsAfterFinished: KEPT_SECONDS,
      template: {
        spec: {
          nodeSelector: workloadClassMemberSelector(CLASS),
          restartPolicy: "Never",
          volumes: [{ name: WORK, emptyDir: {} }],
          containers: [
            {
              name: deploy.name,
              image: refFor(`${TOOLS}/${ci.slug}`, LATEST),
              command: ["sh", "-c", scriptFor(given, subject, commit)],
              env: [
                { name: "HOME", value: ORCHESTRATOR_CACHE_MOUNT_PATH },
                { name: ROOM, value: ROOM_GB },
                {
                  name: GIT_TOKEN,
                  valueFrom: { secretKeyRef: { name: JOB_SECRET, key: GIT_TOKEN } },
                },
              ],
              volumeMounts: [{ name: WORK, mountPath: ORCHESTRATOR_CACHE_MOUNT_PATH }],
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

export function jobYamlFor(given: string | Reading, subject: string, commit: string): string {
  return synthOne(NAMESPACE, jobNameFor(subject, commit), jobFor(given, subject, commit))
}
