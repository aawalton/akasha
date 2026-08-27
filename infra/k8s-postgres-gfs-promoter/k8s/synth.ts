import { synthOne } from "@infra/k8s-types/cdk8s-synth"
import { capabilitySelector } from "@infra/k8s-types/hostnames"

const NAMESPACE = "postgres"

const GFS_PROMOTER_IMAGE =
  "registry.registry.svc.cluster.local:5000/cluster/postgres-gfs-promoter:r4"

const LABELS = {
  "app.kubernetes.io/name": "postgres-gfs-promoter",
  "app.kubernetes.io/instance": "postgres",
  "app.kubernetes.io/component": "gfs-promoter",
  "app.kubernetes.io/part-of": "postgres",
  "app.kubernetes.io/managed-by": "bootstrap",
} as const

const BACKUP_S3_SECRET = "postgres-cnpg-backup-s3"

function cronjobYaml(): string {
  return synthOne(NAMESPACE, "postgres-gfs-promoter-cronjob", {
    apiVersion: "batch/v1",
    kind: "CronJob",
    metadata: {
      name: "postgres-gfs-promoter",
      namespace: NAMESPACE,
      labels: LABELS,
    },
    spec: {
      schedule: "17 2 * * *",
      concurrencyPolicy: "Forbid",
      successfulJobsHistoryLimit: 3,
      failedJobsHistoryLimit: 3,
      jobTemplate: {
        spec: {
          ttlSecondsAfterFinished: 86400,
          backoffLimit: 2,
          template: {
            metadata: { labels: LABELS },
            spec: {
              restartPolicy: "OnFailure",
              containers: [
                {
                  name: "gfs-promoter",
                  image: GFS_PROMOTER_IMAGE,
                  imagePullPolicy: "Always",
                  env: [
                    { name: "NODE_ENV", value: "production" },
                    {
                      name: "AWS_ACCESS_KEY_ID",
                      valueFrom: {
                        secretKeyRef: { name: BACKUP_S3_SECRET, key: "access_key" },
                      },
                    },
                    {
                      name: "AWS_SECRET_ACCESS_KEY",
                      valueFrom: {
                        secretKeyRef: { name: BACKUP_S3_SECRET, key: "secret_key" },
                      },
                    },
                    {
                      name: "DATABASE_URL",
                      valueFrom: {
                        secretKeyRef: { name: "postgres-secrets", key: "DATABASE_URL" },
                      },
                    },
                  ],
                  securityContext: {
                    runAsNonRoot: true,
                    runAsUser: 1000,
                    allowPrivilegeEscalation: false,
                    capabilities: { drop: ["ALL"] },
                  },
                  resources: {
                    requests: { cpu: "50m", memory: "256Mi" },
                    limits: { memory: "256Mi" },
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

const LONGTAIL_NAMESPACE = "seaweedfs"

const LONGTAIL_LABELS = {
  "app.kubernetes.io/name": "seaweedfs-backup-longtail",
  "app.kubernetes.io/instance": "postgres",
  "app.kubernetes.io/component": "backup-longtail",
  "app.kubernetes.io/part-of": "postgres",
  "app.kubernetes.io/managed-by": "bootstrap",
} as const

const LONGTAIL_S3_SECRET = "seaweedfs-creds"
const LONGTAIL_DB_SECRET = "postgres-longtail-db"

function longtailCronjobYaml(): string {
  return synthOne(LONGTAIL_NAMESPACE, "seaweedfs-backup-longtail-cronjob", {
    apiVersion: "batch/v1",
    kind: "CronJob",
    metadata: {
      name: "seaweedfs-backup-longtail",
      namespace: LONGTAIL_NAMESPACE,
      labels: LONGTAIL_LABELS,
    },
    spec: {
      schedule: "17 4 * * *",
      concurrencyPolicy: "Forbid",
      successfulJobsHistoryLimit: 1,
      failedJobsHistoryLimit: 3,
      jobTemplate: {
        spec: {
          ttlSecondsAfterFinished: 86400,
          backoffLimit: 2,
          activeDeadlineSeconds: 43200,
          template: {
            metadata: { labels: LONGTAIL_LABELS },
            spec: {
              restartPolicy: "OnFailure",
              nodeSelector: capabilitySelector("ci"),
              securityContext: { seccompProfile: { type: "RuntimeDefault" } },
              containers: [
                {
                  name: "backup-longtail",
                  image: GFS_PROMOTER_IMAGE,
                  imagePullPolicy: "Always",
                  command: [
                    "/sbin/tini",
                    "--",
                    "bun",
                    "run",
                    "infra/k8s-postgres-gfs-promoter/src/longtail-main.ts",
                  ],
                  env: [
                    { name: "NODE_ENV", value: "production" },
                    { name: "HOME", value: "/tmp" },
                    { name: "RCLONE_CONFIG_SRC_TYPE", value: "s3" },
                    { name: "RCLONE_CONFIG_SRC_PROVIDER", value: "Other" },
                    {
                      name: "RCLONE_CONFIG_SRC_ENDPOINT",
                      value: "http://s3-gateway.seaweedfs.svc.cluster.local:8333",
                    },
                    {
                      name: "RCLONE_CONFIG_SRC_ACCESS_KEY_ID",
                      valueFrom: {
                        secretKeyRef: { name: LONGTAIL_S3_SECRET, key: "access_key" },
                      },
                    },
                    {
                      name: "RCLONE_CONFIG_SRC_SECRET_ACCESS_KEY",
                      valueFrom: {
                        secretKeyRef: { name: LONGTAIL_S3_SECRET, key: "secret_key" },
                      },
                    },
                    {
                      name: "DATABASE_URL",
                      valueFrom: {
                        secretKeyRef: { name: LONGTAIL_DB_SECRET, key: "DATABASE_URL" },
                      },
                    },
                  ],
                  volumeMounts: [
                    { name: "backup", mountPath: "/backup" },
                    { name: "tmp", mountPath: "/tmp" },
                  ],
                  securityContext: {
                    runAsNonRoot: true,
                    runAsUser: 1000,
                    allowPrivilegeEscalation: false,
                    capabilities: { drop: ["ALL"] },
                  },
                  resources: {
                    requests: { cpu: "100m", memory: "512Mi" },
                    limits: { memory: "512Mi" },
                  },
                },
              ],
              volumes: [
                { name: "backup", persistentVolumeClaim: { claimName: "seaweedfs-backup" } },
                { name: "tmp", emptyDir: { sizeLimit: "512Mi" } },
              ],
            },
          },
        },
      },
    },
  })
}

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "cronjob", yaml: cronjobYaml() },
    { name: "longtail-cronjob", yaml: longtailCronjobYaml() },
  ]
}
