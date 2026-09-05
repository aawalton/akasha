import { synthOne } from "@akasha/k8s-types/cdk8s-synth"
import { workloadClassMemberSelector } from "@akasha/k8s-types/hostnames"

function cronjobYaml(): string {
  return synthOne("alanwalton", "calendar-sync", {
    apiVersion: "batch/v1",
    kind: "CronJob",
    metadata: { name: "calendar-sync", namespace: "alanwalton" },
    spec: {
      schedule: "40 8 * * *",
      concurrencyPolicy: "Forbid",
      successfulJobsHistoryLimit: 1,
      failedJobsHistoryLimit: 1,
      jobTemplate: {
        spec: {
          activeDeadlineSeconds: 900,
          ttlSecondsAfterFinished: 600,
          template: {
            metadata: { labels: { "app.kubernetes.io/name": "calendar-sync" } },
            spec: {
              restartPolicy: "OnFailure",
              nodeSelector: workloadClassMemberSelector("serve"),
              containers: [
                {
                  name: "sync",
                  image: "MUST_BE_SET_BY_DEPLOY_SCRIPT",
                  command: [
                    "bun",
                    "run",
                    "--cwd",
                    "akasha/calendar-sync",
                    "run-sync/run-sync.module.code.ts",
                  ],
                  envFrom: [{ secretRef: { name: "alanwalton-secrets" } }],
                  resources: {
                    requests: { cpu: "100m", memory: "512Mi" },
                    limits: { cpu: "500m", memory: "512Mi" },
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
  return [{ name: "cronjob", yaml: cronjobYaml() }]
}
