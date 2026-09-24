import { synthOne } from "akasha/infrastructure/cluster/k8s-type/modules/cdk8s-synth/cdk8s-synth.module.code.ts"
import { resourcesOf } from "akasha/infrastructure/cluster/k8s-type/modules/container-resources/container-resources.module.code.ts"
import { workloadClassMemberSelector } from "akasha/infrastructure/cluster/k8s-type/modules/hostnames/hostnames.module.code.ts"
import { buildkitPrune as page } from "akasha/infrastructure/container-image/buildkit-prune/buildkit-prune.manifest.ts"
import { buildkitPrune } from "akasha/infrastructure/service/akasha-service/service-cluster/pages/buildkit-prune/buildkit-prune.service-cluster.ts"

const NAMESPACE = buildkitPrune.namespace
const APP_NAME = "buildkit"
const INSTANCE_NAME = "infra"
const COMPONENT = "buildkit"
const PART_OF = "infra"
const MANAGED_BY = "deploy-script"

const RESOURCE_LABELS = {
  "app.kubernetes.io/name": APP_NAME,
  "app.kubernetes.io/instance": INSTANCE_NAME,
  "app.kubernetes.io/component": COMPONENT,
  "app.kubernetes.io/part-of": PART_OF,
  "app.kubernetes.io/managed-by": MANAGED_BY,
} as const

const CRONJOB_POD_LABELS = {
  "app.kubernetes.io/name": APP_NAME,
  "app.kubernetes.io/instance": INSTANCE_NAME,
  "app.kubernetes.io/component": COMPONENT,
} as const

function pruneCronjobYaml(): string {
  return synthOne(NAMESPACE, "prune-cronjob", {
    apiVersion: "batch/v1",
    kind: buildkitPrune.resourceKind,
    metadata: {
      name: buildkitPrune.resourceName,
      labels: RESOURCE_LABELS,
    },
    spec: {
      schedule: buildkitPrune.schedule,
      concurrencyPolicy: "Forbid",
      successfulJobsHistoryLimit: 1,
      failedJobsHistoryLimit: 3,
      jobTemplate: {
        spec: {
          ttlSecondsAfterFinished: 3600,
          template: {
            metadata: { labels: CRONJOB_POD_LABELS },
            spec: {
              nodeSelector: workloadClassMemberSelector("build"),
              restartPolicy: "OnFailure",
              containers: [
                {
                  name: "prune",
                  image: buildkitPrune.image,
                  command: [
                    "buildctl",
                    "--addr",
                    "tcp://buildkit.buildkit.svc.cluster.local:1234",
                    "prune",
                    "--keep-storage",
                    "30000",
                  ],
                  resources: resourcesOf(page),
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
  return [{ name: "prune-cronjob", yaml: pruneCronjobYaml() }]
}
