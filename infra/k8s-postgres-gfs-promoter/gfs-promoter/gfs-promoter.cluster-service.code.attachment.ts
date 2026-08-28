import { synthOne } from "@infra/k8s-types/cdk8s-synth"

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

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [{ name: "cronjob", yaml: cronjobYaml() }]
}
