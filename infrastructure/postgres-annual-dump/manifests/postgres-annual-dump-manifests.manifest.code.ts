import { synthOne } from "akasha/infrastructure/cluster/k8s-type/modules/cdk8s-synth/cdk8s-synth.module.code.ts"
import { synthCronjob } from "akasha/infrastructure/cluster/k8s-type/modules/manifest-composing/manifest-composing.module.code.ts"
import { postgresAnnualDump } from "akasha/infrastructure/service/cluster/pages/postgres-annual-dump/postgres-annual-dump.service-cluster.ts"

const NAMESPACE = postgresAnnualDump.namespace

const ANNUAL_DUMP_IMAGE = postgresAnnualDump.image

const LABELS = {
  "app.kubernetes.io/name": postgresAnnualDump.resourceName,
  "app.kubernetes.io/instance": "postgres",
  "app.kubernetes.io/component": "annual-dump",
  "app.kubernetes.io/part-of": "postgres",
  "app.kubernetes.io/managed-by": "bootstrap",
} as const

const SUPERUSER_SECRET = "postgres-cnpg-superuser"

const BACKUP_S3_SECRET = "postgres-cnpg-backup-s3"

function cronjobYaml(): string {
  return synthOne(NAMESPACE, "postgres-annual-dump-cronjob", {
    apiVersion: "batch/v1",
    kind: "CronJob",
    metadata: {
      name: postgresAnnualDump.resourceName,
      namespace: NAMESPACE,
      labels: LABELS,
    },
    spec: {
      schedule: "13 5 1 1 *",
      concurrencyPolicy: "Forbid",
      successfulJobsHistoryLimit: 3,
      failedJobsHistoryLimit: 3,
      jobTemplate: {
        spec: {
          ttlSecondsAfterFinished: 86400,
          backoffLimit: 2,
          activeDeadlineSeconds: 21600,
          template: {
            metadata: { labels: LABELS },
            spec: {
              restartPolicy: "OnFailure",
              securityContext: { seccompProfile: { type: "RuntimeDefault" } },
              containers: [
                {
                  name: "annual-dump",
                  image: ANNUAL_DUMP_IMAGE,
                  imagePullPolicy: "Always",
                  command: ["/usr/local/bin/annual-dump.sh"],
                  env: [
                    { name: "HOME", value: "/tmp" },
                    {
                      name: "PGHOST",
                      value: "postgres.postgres.svc.cluster.local",
                    },
                    { name: "PGPORT", value: "5432" },
                    { name: "PGDATABASE", value: "postgres" },
                    {
                      name: "PGUSER",
                      valueFrom: {
                        secretKeyRef: { name: SUPERUSER_SECRET, key: "username" },
                      },
                    },
                    {
                      name: "PGPASSWORD",
                      valueFrom: {
                        secretKeyRef: { name: SUPERUSER_SECRET, key: "password" },
                      },
                    },
                    { name: "RCLONE_CONFIG_DST_TYPE", value: "s3" },
                    { name: "RCLONE_CONFIG_DST_PROVIDER", value: "Other" },
                    {
                      name: "RCLONE_CONFIG_DST_ENDPOINT",
                      value: "http://s3-gateway.seaweedfs.svc.cluster.local:8333",
                    },
                    {
                      name: "RCLONE_CONFIG_DST_ACCESS_KEY_ID",
                      valueFrom: {
                        secretKeyRef: { name: BACKUP_S3_SECRET, key: "access_key" },
                      },
                    },
                    {
                      name: "RCLONE_CONFIG_DST_SECRET_ACCESS_KEY",
                      valueFrom: {
                        secretKeyRef: { name: BACKUP_S3_SECRET, key: "secret_key" },
                      },
                    },
                  ],
                  volumeMounts: [{ name: "tmp", mountPath: "/tmp" }],
                  securityContext: {
                    runAsNonRoot: true,
                    runAsUser: 1000,
                    allowPrivilegeEscalation: false,
                    capabilities: { drop: ["ALL"] },
                  },
                  resources: {
                    requests: { cpu: "200m", memory: "1Gi" },
                    limits: { memory: "1Gi" },
                  },
                },
              ],
              volumes: [{ name: "tmp", emptyDir: { sizeLimit: "40Gi" } }],
            },
          },
        },
      },
    },
  })
}

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return synthCronjob(cronjobYaml)
}
