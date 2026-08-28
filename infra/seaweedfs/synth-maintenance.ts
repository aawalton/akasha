import { synthOne } from "@infra/k8s-types/cdk8s-synth"
import { capabilitySelector } from "@infra/k8s-types/hostnames"
import { componentLabels, IMAGE, MASTER_ADDRESS } from "./synth-constants.ts"

export const MAINTENANCE_NAMESPACE = "seaweedfs-maintenance"

export const COMPONENT_MAINTENANCE = "maintenance"

export const BUCKET_QUOTAS_MB = {
  "postgres-cnpg-backups": 350 * 1024,
  "atlas-basemap": 50 * 1024,
  "agent-sessions": 30 * 1024,
  "loki-chunks": 20 * 1024,
} as const

function shellPayload(): string {
  const quotaLines = Object.entries(BUCKET_QUOTAS_MB).map(
    ([bucket, sizeMB]) => `s3.bucket.quota -name=${bucket} -op=set -sizeMB=${sizeMB}`
  )
  return [
    "lock",
    ...quotaLines,
    "s3.bucket.quota.enforce -apply",
    "volume.vacuum -garbageThreshold=0.1",
    "unlock",
  ].join("\n")
}

function maintenanceScript(): string {
  return [
    "set -eu",
    `echo "seaweedfs weekly maintenance: quota set + enforce + vacuum"`,
    `weed shell -master=${MASTER_ADDRESS} <<'WEED'`,
    shellPayload(),
    "WEED",
    'echo "maintenance complete"',
  ].join("\n")
}

export function maintenanceCronJobYaml(): string {
  const name = "seaweedfs-maintenance"
  const labels = componentLabels(COMPONENT_MAINTENANCE)
  return synthOne(MAINTENANCE_NAMESPACE, name, {
    apiVersion: "batch/v1",
    kind: "CronJob",
    metadata: { name, namespace: MAINTENANCE_NAMESPACE, labels },
    spec: {
      schedule: "43 6 * * 0",
      concurrencyPolicy: "Forbid",
      startingDeadlineSeconds: 300,
      successfulJobsHistoryLimit: 1,
      failedJobsHistoryLimit: 3,
      jobTemplate: {
        spec: {
          backoffLimit: 1,
          activeDeadlineSeconds: 14400,
          ttlSecondsAfterFinished: 3600,
          template: {
            metadata: { labels },
            spec: {
              restartPolicy: "Never",
              nodeSelector: capabilitySelector("serve"),
              securityContext: { seccompProfile: { type: "RuntimeDefault" } },
              containers: [
                {
                  name: "weed-maintenance",
                  image: IMAGE,
                  command: ["/bin/sh", "-c", maintenanceScript()],
                  env: [{ name: "HOME", value: "/tmp" }],
                  resources: {
                    requests: { cpu: "100m", memory: "256Mi" },
                    limits: { memory: "256Mi" },
                  },
                  securityContext: {
                    runAsNonRoot: true,
                    runAsUser: 1000,
                    readOnlyRootFilesystem: true,
                    allowPrivilegeEscalation: false,
                    capabilities: { drop: ["ALL"] },
                  },
                  volumeMounts: [{ name: "tmp", mountPath: "/tmp" }],
                },
              ],
              volumes: [{ name: "tmp", emptyDir: { sizeLimit: "256Mi" } }],
            },
          },
        },
      },
    },
  })
}
