import { synthOne } from "akasha/infrastructure/cluster/k8s-types/cdk8s-synth/cdk8s-synth.module.code.ts"
import { workloadClassMemberSelector } from "akasha/infrastructure/cluster/k8s-types/hostnames/hostnames.module.code.ts"
import { BUN_RUNTIME_IMAGE } from "akasha/infrastructure/cluster/k8s-types/orchestrator-cache-locations/orchestrator-cache-locations.module.code.ts"
import { NAMESPACE, RESOURCE_LABELS } from "../transport-naming/transport-naming.module.code.ts"

const JANITOR_NAME = "git-transport-janitor"
const REPOSITORIES = "/data/git/repositories"
const SCHEDULE = "0 * * * *"
const STALE_MINUTES = 180

const SWEEP = `set -eu
find ${REPOSITORIES} -maxdepth 5 -mmin +${STALE_MINUTES} \\( -name 'tmp_objdir-*' -o -name 'tmp_pack_*' \\) -print -prune -exec rm -rf {} ';'
echo "swept ${REPOSITORIES} of push debris older than ${STALE_MINUTES} minutes"`

function janitorCronjobYaml(): string {
  return synthOne(NAMESPACE, "janitor-cronjob", {
    apiVersion: "batch/v1",
    kind: "CronJob",
    metadata: { name: JANITOR_NAME, namespace: NAMESPACE, labels: RESOURCE_LABELS },
    spec: {
      schedule: SCHEDULE,
      concurrencyPolicy: "Forbid",
      successfulJobsHistoryLimit: 1,
      failedJobsHistoryLimit: 3,
      jobTemplate: {
        spec: {
          ttlSecondsAfterFinished: 3600,
          template: {
            metadata: { labels: RESOURCE_LABELS },
            spec: {
              nodeSelector: workloadClassMemberSelector("build"),
              restartPolicy: "OnFailure",
              securityContext: { fsGroup: 1000, fsGroupChangePolicy: "OnRootMismatch" },
              containers: [
                {
                  name: "sweep",
                  image: BUN_RUNTIME_IMAGE,
                  imagePullPolicy: "IfNotPresent",
                  command: ["sh", "-c", SWEEP],
                  volumeMounts: [{ name: "data", mountPath: REPOSITORIES }],
                  resources: {
                    requests: { cpu: "100m", memory: "128Mi" },
                    limits: { cpu: "500m", memory: "128Mi" },
                  },
                  securityContext: {
                    runAsNonRoot: true,
                    runAsUser: 1000,
                    allowPrivilegeEscalation: false,
                    capabilities: { drop: ["ALL"] },
                  },
                },
              ],
              volumes: [
                {
                  name: "data",
                  persistentVolumeClaim: { claimName: "git-transport-data" },
                },
              ],
            },
          },
        },
      },
    },
  })
}

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [{ name: "janitor-cronjob", yaml: janitorCronjobYaml() }]
}
