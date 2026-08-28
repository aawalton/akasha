import { synthOne } from "@infra/k8s-types/cdk8s-synth"
import { workloadClassMemberSelector } from "@infra/k8s-types/hostnames"

const NAMESPACE = "buildkit"
const APP_NAME = "buildkit"
const INSTANCE_NAME = "infra"
const COMPONENT = "buildkit"
const PART_OF = "infra"
const MANAGED_BY = "deploy-script"
const BUILDKIT_IMAGE = "moby/buildkit:v0.28.0"

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
    kind: "CronJob",
    metadata: {
      name: "buildkit-prune",
      labels: RESOURCE_LABELS,
    },
    spec: {
      schedule: "0 4 * * 0",
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
                  image: BUILDKIT_IMAGE,
                  command: [
                    "buildctl",
                    "--addr",
                    "tcp://buildkit.buildkit.svc.cluster.local:1234",
                    "prune",
                    "--keep-storage",
                    "30000",
                  ],
                  resources: {
                    requests: { cpu: "100m", memory: "256Mi" },
                    limits: { cpu: "500m", memory: "256Mi" },
                  },
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
