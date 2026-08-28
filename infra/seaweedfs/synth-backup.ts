import { synthOne } from "@infra/k8s-types/cdk8s-synth"
import { capabilitySelector, HOSTNAME_KEY } from "@infra/k8s-types/hostnames"
import { componentLabels, S3_GATEWAY_ENDPOINT } from "./synth-constants.ts"

const RCLONE_IMAGE = "rclone/rclone:1.74.3"

const SRC_SECRET = "seaweedfs-creds"

export const COMPONENT_BACKUP = "backup"

const BACKUP_NODE = "node-06"
const BACKUP_HOST_PATH = "/var/lib/seaweedfs-backup"
export const CNPG_NAMESPACE = "seaweedfs-backup-cnpg"
export const BULK_NAMESPACE = "seaweedfs-backup-bulk"
const BACKUP_CAPACITY = "500Gi"
const BACKUP_MOUNT = "/backup"

function secretEnv(name: string, secretName: string, key: string) {
  return { name, valueFrom: { secretKeyRef: { name: secretName, key } } }
}

function rcloneEnv(goMemLimit?: string) {
  return [
    { name: "HOME", value: "/tmp" },
    { name: "RCLONE_CONFIG_SRC_TYPE", value: "s3" },
    { name: "RCLONE_CONFIG_SRC_PROVIDER", value: "Other" },
    { name: "RCLONE_CONFIG_SRC_ENDPOINT", value: S3_GATEWAY_ENDPOINT },
    secretEnv("RCLONE_CONFIG_SRC_ACCESS_KEY_ID", SRC_SECRET, "access_key"),
    secretEnv("RCLONE_CONFIG_SRC_SECRET_ACCESS_KEY", SRC_SECRET, "secret_key"),
    ...(goMemLimit !== undefined ? [{ name: "GOMEMLIMIT", value: goMemLimit }] : []),
  ]
}

function syncScript(buckets: readonly string[], useMmap: boolean): string {
  const list = buckets.join(" ")
  return [
    "set -u",
    `echo "rclone $(rclone version | head -n1) syncing to ${BACKUP_MOUNT}"`,
    'failed=""',
    `for b in ${list}; do`,
    '  echo "==> sync $b"',
    `  if rclone sync "src:$b" "${BACKUP_MOUNT}/$b" \\`,
    "    --transfers 2 \\",
    "    --checkers 4 \\",
    "    --multi-thread-streams 0 \\",
    ...(useMmap ? ["    --use-mmap \\"] : []),
    "    --stats-one-line \\",
    "    --stats 30s; then",
    '    echo "<== done $b"',
    "  else",
    '    echo "<== FAILED $b" >&2',
    '    failed="$failed $b"',
    "  fi",
    "done",
    'if [ -n "$failed" ]; then',
    '  echo "buckets failed:$failed" >&2',
    "  exit 1",
    "fi",
    'echo "all buckets synced"',
  ].join("\n")
}

interface BackupCronJobConfig {
  readonly name: string
  readonly namespace: string
  readonly schedule: string
  readonly buckets: readonly string[]
  readonly memoryLimit: string
  readonly goMemLimit?: string
}

function backupCronJobYaml(config: BackupCronJobConfig): string {
  const { name, namespace, schedule, buckets, memoryLimit, goMemLimit } = config
  const labels = componentLabels(COMPONENT_BACKUP)
  return synthOne(namespace, name, {
    apiVersion: "batch/v1",
    kind: "CronJob",
    metadata: { name, namespace, labels },
    spec: {
      schedule,
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
              initContainers: [
                {
                  name: "init-perms",
                  image: RCLONE_IMAGE,
                  command: ["chown", "1000:1000", BACKUP_MOUNT],
                  resources: {
                    requests: { cpu: "10m", memory: "16Mi" },
                    limits: { memory: "16Mi" },
                  },
                  securityContext: {
                    runAsUser: 0,
                    runAsNonRoot: false,
                    readOnlyRootFilesystem: true,
                    allowPrivilegeEscalation: false,
                    capabilities: { drop: ["ALL"], add: ["CHOWN"] },
                  },
                  volumeMounts: [{ name: "backup", mountPath: BACKUP_MOUNT }],
                },
              ],
              containers: [
                {
                  name: "rclone-sync",
                  image: RCLONE_IMAGE,
                  command: ["/bin/sh", "-c", syncScript(buckets, goMemLimit !== undefined)],
                  env: rcloneEnv(goMemLimit),
                  resources: {
                    requests: { cpu: "100m", memory: "512Mi" },
                    limits: { memory: memoryLimit },
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
                { name: "backup", persistentVolumeClaim: { claimName: name } },
              ],
            },
          },
        },
      },
    },
  })
}

export function backupCnpgCronJobYaml(): string {
  return backupCronJobYaml({
    name: "seaweedfs-backup-cnpg",
    namespace: CNPG_NAMESPACE,
    schedule: "7,22,37,52 * * * *",
    buckets: ["postgres-cnpg-backups"],
    memoryLimit: "512Mi",
  })
}

export function backupBulkCronJobYaml(): string {
  return backupCronJobYaml({
    name: "seaweedfs-backup-bulk",
    namespace: BULK_NAMESPACE,
    schedule: "40 4 * * *",
    buckets: ["loki-chunks", "agent-sessions", "headscale-db"],
    memoryLimit: "1Gi",
    goMemLimit: "900MiB",
  })
}

export function backupPvYaml(namespace: string, name: string): string {
  return synthOne(namespace, "backup-pv", {
    apiVersion: "v1",
    kind: "PersistentVolume",
    metadata: { name, labels: componentLabels(COMPONENT_BACKUP) },
    spec: {
      capacity: { storage: BACKUP_CAPACITY },
      volumeMode: "Filesystem",
      accessModes: ["ReadWriteOnce"],
      persistentVolumeReclaimPolicy: "Retain",
      storageClassName: "",
      hostPath: { path: BACKUP_HOST_PATH, type: "DirectoryOrCreate" },
      claimRef: { namespace, name },
      nodeAffinity: {
        required: {
          nodeSelectorTerms: [
            {
              matchExpressions: [{ key: HOSTNAME_KEY, operator: "In", values: [BACKUP_NODE] }],
            },
          ],
        },
      },
    },
  })
}

export function backupPvcYaml(namespace: string, name: string): string {
  return synthOne(namespace, "backup-pvc", {
    apiVersion: "v1",
    kind: "PersistentVolumeClaim",
    metadata: {
      name,
      namespace,
      labels: componentLabels(COMPONENT_BACKUP),
    },
    spec: {
      accessModes: ["ReadWriteOnce"],
      storageClassName: "",
      volumeName: name,
      resources: { requests: { storage: BACKUP_CAPACITY } },
    },
  })
}
