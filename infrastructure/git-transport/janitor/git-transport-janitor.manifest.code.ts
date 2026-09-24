import { synthOne } from "akasha/infrastructure/cluster/k8s-type/modules/cdk8s-synth/cdk8s-synth.module.code.ts"
import { resourcesOf } from "akasha/infrastructure/cluster/k8s-type/modules/container-resources/container-resources.module.code.ts"
import { workloadClassMemberSelector } from "akasha/infrastructure/cluster/k8s-type/modules/hostnames/hostnames.module.code.ts"
import { gitTransportJanitor as page } from "akasha/infrastructure/git-transport/janitor/git-transport-janitor.manifest.ts"
import {
  JANITOR_LABELS,
  NAMESPACE,
} from "akasha/infrastructure/git-transport/modules/transport-naming/transport-naming.module.code.ts"
import { gitTransportJanitor } from "akasha/infrastructure/service/akasha-service/service-cluster/pages/git-transport-janitor/git-transport-janitor.service-cluster.ts"

const REPOSITORIES = "/data/git/repositories"
const STALE_MINUTES = 180
const HEADROOM_KIB = 524288

const SWEEP = `set -eu
find ${REPOSITORIES} -maxdepth 5 -mmin +${STALE_MINUTES} \\( -name 'tmp_objdir-*' -o -name 'tmp_pack_*' \\) -print -prune -exec rm -rf {} ';'
echo "swept ${REPOSITORIES} of push debris older than ${STALE_MINUTES} minutes"
for repo in ${REPOSITORIES}/*/*.git; do
  if [ ! -d "$repo/objects" ]; then continue; fi
  free=$(df -k "$repo" | awk 'END { print $(NF-2) }')
  loose=$(git -C "$repo" count-objects -v | awk '$1 == "size:" { print $2 }')
  packed=0
  largest=0
  for pack in "$repo"/objects/pack/*.pack; do
    if [ -f "$pack" ]; then
      size=$(du -k "$pack" | awk '{ print $1 }')
      packed=$((packed + size))
      if [ "$size" -gt "$largest" ]; then largest=$size; fi
    fi
  done
  rolled=$((loose + packed - largest))
  if [ "$((rolled * 2))" -lt "$largest" ]; then
    need=$((rolled + ${HEADROOM_KIB}))
  else
    need=$((loose + packed + ${HEADROOM_KIB}))
  fi
  if [ "$free" -lt "$need" ]; then
    echo "$repo: left unrepacked, $free KiB free under the $need KiB a repack of it writes"
    continue
  fi
  git -C "$repo" -c pack.threads=1 -c pack.windowMemory=64m -c pack.deltaCacheSize=64m repack -d --geometric=2
  echo "$repo: repacked, $(df -k "$repo" | awk 'END { print $(NF-2) }') KiB free on the volume"
done`

function janitorCronjobYaml(): string {
  return synthOne(NAMESPACE, "janitor-cronjob", {
    apiVersion: "batch/v1",
    kind: gitTransportJanitor.resourceKind,
    metadata: {
      name: gitTransportJanitor.resourceName,
      namespace: gitTransportJanitor.namespace,
      labels: JANITOR_LABELS,
    },
    spec: {
      schedule: gitTransportJanitor.schedule,
      concurrencyPolicy: "Forbid",
      successfulJobsHistoryLimit: 1,
      failedJobsHistoryLimit: 3,
      jobTemplate: {
        spec: {
          ttlSecondsAfterFinished: 3600,
          template: {
            metadata: { labels: JANITOR_LABELS },
            spec: {
              nodeSelector: workloadClassMemberSelector("build"),
              restartPolicy: "OnFailure",
              securityContext: { fsGroup: 1000, fsGroupChangePolicy: "OnRootMismatch" },
              containers: [
                {
                  name: "sweep",
                  image: gitTransportJanitor.image,
                  imagePullPolicy: "IfNotPresent",
                  command: ["sh", "-c", SWEEP],
                  volumeMounts: [{ name: "data", mountPath: REPOSITORIES }],
                  resources: resourcesOf(page),
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
