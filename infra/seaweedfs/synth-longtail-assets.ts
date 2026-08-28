import { synthOne } from "@infra/k8s-types/cdk8s-synth"
import { capabilitySelector } from "@infra/k8s-types/hostnames"
import {
  ASSETS_BUCKET,
  componentLabels,
  NON_EXPIRING_PREFIXES,
  S3_GATEWAY_ENDPOINT,
} from "./synth-constants.ts"

const RCLONE_IMAGE = "rclone/rclone:1.74.3"

const SRC_SECRET = "seaweedfs-creds"

export const ASSETS_NAMESPACE = "seaweedfs-backup-assets"

export const COMPONENT_BACKUP_ASSETS = "backup-assets"

const BACKUP_MOUNT = "/backup"

const ASSET_LONGTAIL_ROOT = `${BACKUP_MOUNT}/_longtail/${ASSETS_BUCKET}`

const ASSET_BUDGET_BYTES = 50 * 1024 ** 3

const ASSET_REVIEW_THRESHOLD = 0.8

const ASSET_REVIEW_BYTES = ASSET_BUDGET_BYTES * ASSET_REVIEW_THRESHOLD

function secretEnv(name: string, secretName: string, key: string) {
  return { name, valueFrom: { secretKeyRef: { name: secretName, key } } }
}

function rcloneEnv() {
  return [
    { name: "HOME", value: "/tmp" },
    { name: "RCLONE_CONFIG_SRC_TYPE", value: "s3" },
    { name: "RCLONE_CONFIG_SRC_PROVIDER", value: "Other" },
    { name: "RCLONE_CONFIG_SRC_ENDPOINT", value: S3_GATEWAY_ENDPOINT },
    secretEnv("RCLONE_CONFIG_SRC_ACCESS_KEY_ID", SRC_SECRET, "access_key"),
    secretEnv("RCLONE_CONFIG_SRC_SECRET_ACCESS_KEY", SRC_SECRET, "secret_key"),
  ]
}

export function assetCopyScript(): string {
  const list = NON_EXPIRING_PREFIXES.join(" ")
  return [
    "set -u",
    `echo "rclone $(rclone version | head -n1) copying to ${ASSET_LONGTAIL_ROOT}"`,
    'failed=""',
    `for p in ${list}; do`,
    '  echo "==> copy $p"',
    `  if rclone copy "src:${ASSETS_BUCKET}/$p" "${ASSET_LONGTAIL_ROOT}/$p" \\`,
    "    --transfers 2 \\",
    "    --checkers 4 \\",
    "    --multi-thread-streams 0 \\",
    "    --stats-one-line \\",
    "    --stats 30s; then",
    '    echo "<== done $p"',
    "  else",
    '    echo "<== FAILED $p" >&2',
    '    failed="$failed $p"',
    "  fi",
    "done",
    'if [ -n "$failed" ]; then',
    '  echo "prefixes failed:$failed" >&2',
    "  exit 1",
    "fi",
    'echo "all prefixes copied"',
    `used_kib=$(du -sk "${ASSET_LONGTAIL_ROOT}" 2>/dev/null | cut -f1)`,
    "used=$(( ${used_kib:-0} * 1024 ))",
    `echo "asset-longtail: $used/${ASSET_BUDGET_BYTES} bytes, review at ${ASSET_REVIEW_BYTES}"`,
    `if [ "$used" -gt ${ASSET_REVIEW_BYTES} ]; then`,
    `  echo "asset-longtail: over ${ASSET_REVIEW_THRESHOLD * 100}% of the declared budget — review due, nothing deleted" >&2`,
    "  exit 1",
    "fi",
    'echo "asset-longtail: within budget"',
  ].join("\n")
}

export function backupAssetsCronJobYaml(): string {
  const name = "seaweedfs-backup-assets"
  const labels = componentLabels(COMPONENT_BACKUP_ASSETS)
  return synthOne(ASSETS_NAMESPACE, name, {
    apiVersion: "batch/v1",
    kind: "CronJob",
    metadata: { name, namespace: ASSETS_NAMESPACE, labels },
    spec: {
      schedule: "5 5 * * *",
      concurrencyPolicy: "Forbid",
      startingDeadlineSeconds: 300,
      successfulJobsHistoryLimit: 1,
      failedJobsHistoryLimit: 3,
      jobTemplate: {
        spec: {
          backoffLimit: 2,
          activeDeadlineSeconds: 43200,
          ttlSecondsAfterFinished: 3600,
          template: {
            metadata: { labels },
            spec: {
              restartPolicy: "Never",
              nodeSelector: capabilitySelector("ci"),
              securityContext: { seccompProfile: { type: "RuntimeDefault" } },
              containers: [
                {
                  name: "rclone-copy",
                  image: RCLONE_IMAGE,
                  command: ["/bin/sh", "-c", assetCopyScript()],
                  env: rcloneEnv(),
                  resources: {
                    requests: { cpu: "100m", memory: "512Mi" },
                    limits: { memory: "512Mi" },
                  },
                  securityContext: {
                    runAsNonRoot: true,
                    runAsUser: 1000,
                    readOnlyRootFilesystem: true,
                    allowPrivilegeEscalation: false,
                    capabilities: { drop: ["ALL"] },
                  },
                  volumeMounts: [
                    { name: "tmp", mountPath: "/tmp" },
                    { name: "backup", mountPath: BACKUP_MOUNT },
                  ],
                },
              ],
              volumes: [
                { name: "tmp", emptyDir: { sizeLimit: "512Mi" } },
                { name: "backup", persistentVolumeClaim: { claimName: ASSETS_NAMESPACE } },
              ],
            },
          },
        },
      },
    },
  })
}
