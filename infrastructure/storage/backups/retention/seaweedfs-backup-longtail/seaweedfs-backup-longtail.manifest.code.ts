import { capabilitySelector } from "akasha/infrastructure/cluster/k8s-types/hostnames/hostnames.module.code.ts"
import { synthCronjob } from "akasha/infrastructure/cluster/k8s-types/manifest-composing/manifest-composing.module.code.ts"
import { synthOne } from "akasha/infrastructure/cluster/k8s-types/modules/cdk8s-synth/cdk8s-synth.module.code.ts"
import {
  CONTAINER_TMP_PATH,
  CONTAINER_TMP_VOLUME,
} from "akasha/infrastructure/cluster/k8s-types/orchestrator-cache-locations/orchestrator-cache-locations.module.code.ts"
import { akashaRoot } from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"

const NAMESPACE = "seaweedfs"

const MODULE = "module"
const COPIER = "copy-longtail"
const CODE = "code"
const TS = "ts"

function copierAt(): string {
  const page = listedAt(akashaRoot(), MODULE, COPIER)[0]
  const at = page === undefined ? null : besideAt(page.path, CODE, TS)
  if (at === null) {
    throw new Error(`no \`${MODULE}\` is slugged \`${COPIER}\`, so the job would copy nothing`)
  }
  return at
}

const IMAGE = "registry.registry.svc.cluster.local:5000/cluster/postgres-gfs-promoter:r4"

const LABELS = {
  "app.kubernetes.io/name": "seaweedfs-backup-longtail",
  "app.kubernetes.io/instance": "postgres",
  "app.kubernetes.io/component": "backup-longtail",
  "app.kubernetes.io/part-of": "postgres",
  "app.kubernetes.io/managed-by": "bootstrap",
} as const

const S3_SECRET = "seaweedfs-creds"
const DB_SECRET = "postgres-longtail-db"

function cronjobYaml(): string {
  return synthOne(NAMESPACE, "seaweedfs-backup-longtail-cronjob", {
    apiVersion: "batch/v1",
    kind: "CronJob",
    metadata: {
      name: "seaweedfs-backup-longtail",
      namespace: NAMESPACE,
      labels: LABELS,
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
            metadata: { labels: LABELS },
            spec: {
              restartPolicy: "OnFailure",
              nodeSelector: capabilitySelector("ci"),
              securityContext: { seccompProfile: { type: "RuntimeDefault" } },
              containers: [
                {
                  name: "backup-longtail",
                  image: IMAGE,
                  imagePullPolicy: "Always",
                  command: ["/sbin/tini", "--", "bun", "run", copierAt()],
                  env: [
                    { name: "NODE_ENV", value: "production" },
                    { name: "HOME", value: CONTAINER_TMP_PATH },
                    { name: "RCLONE_CONFIG_SRC_TYPE", value: "s3" },
                    { name: "RCLONE_CONFIG_SRC_PROVIDER", value: "Other" },
                    {
                      name: "RCLONE_CONFIG_SRC_ENDPOINT",
                      value: "http://s3-gateway.seaweedfs.svc.cluster.local:8333",
                    },
                    {
                      name: "RCLONE_CONFIG_SRC_ACCESS_KEY_ID",
                      valueFrom: {
                        secretKeyRef: { name: S3_SECRET, key: "access_key" },
                      },
                    },
                    {
                      name: "RCLONE_CONFIG_SRC_SECRET_ACCESS_KEY",
                      valueFrom: {
                        secretKeyRef: { name: S3_SECRET, key: "secret_key" },
                      },
                    },
                    {
                      name: "DATABASE_URL",
                      valueFrom: {
                        secretKeyRef: { name: DB_SECRET, key: "DATABASE_URL" },
                      },
                    },
                  ],
                  volumeMounts: [
                    { name: "backup", mountPath: "/backup" },
                    { name: CONTAINER_TMP_VOLUME, mountPath: CONTAINER_TMP_PATH },
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
                { name: CONTAINER_TMP_VOLUME, emptyDir: { sizeLimit: "512Mi" } },
              ],
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
