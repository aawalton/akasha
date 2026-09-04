import { synthOne } from "@akasha/k8s-types/cdk8s-synth"
import { kubernetesLabels } from "@akasha/k8s-types/labels"
import {
  NAMESPACE,
  S3_GATEWAY_HTTP_PORT,
} from "../seaweedfs-constants/seaweedfs-constants.module.code.ts"

const TALOSCTL_IMAGE = "ghcr.io/siderolabs/talosctl:v1.12.9"

const RCLONE_IMAGE = "rclone/rclone:1.74.3"

const TARGET_NODE = "192.168.68.87"

const TALOSCONFIG_SECRET = "etcd-snapshot-talosconfig"
const TALOSCONFIG_PATH = "/talos/config"

const SNAPSHOT_PATH = "/snapshot/db.snapshot"

const BUCKET = "etcd-snapshots"
const S3_ENDPOINT = `http://s3-gateway.${NAMESPACE}.svc.cluster.local:${S3_GATEWAY_HTTP_PORT}`
const S3_SECRET = "seaweedfs-creds"

export const RETENTION_DAYS = 30

const MIN_SNAPSHOT_BYTES = 1048576

const LABELS = kubernetesLabels({
  name: "etcd-snapshot",
  instance: "etcd-snapshot",
  component: "backup",
  partOf: "talos-dr",
  managedBy: "bootstrap",
})

function secretEnv(name: string, secretName: string, key: string) {
  return { name, valueFrom: { secretKeyRef: { name: secretName, key } } }
}

function rcloneEnv() {
  return [
    { name: "HOME", value: "/var/tmp" },
    { name: "RCLONE_CONFIG_DST_TYPE", value: "s3" },
    { name: "RCLONE_CONFIG_DST_PROVIDER", value: "Other" },
    { name: "RCLONE_CONFIG_DST_ENDPOINT", value: S3_ENDPOINT },
    secretEnv("RCLONE_CONFIG_DST_ACCESS_KEY_ID", S3_SECRET, "access_key"),
    secretEnv("RCLONE_CONFIG_DST_SECRET_ACCESS_KEY", S3_SECRET, "secret_key"),
  ]
}

function uploadScript(): string {
  return `set -eu
SNAP="${SNAPSHOT_PATH}"
SIZE=$(wc -c < "$SNAP")
echo "etcd snapshot size: $SIZE bytes"
if [ "$SIZE" -lt ${MIN_SNAPSHOT_BYTES} ]; then
  echo "ERROR: snapshot under ${MIN_SNAPSHOT_BYTES} bytes ($SIZE) - refusing to upload an illusory backup" >&2
  exit 1
fi
TS=$(date -u +%Y%m%dT%H%M%SZ)
KEY="db-$TS.snapshot"
echo "uploading $SNAP -> dst:${BUCKET}/$KEY"
rclone copyto --multi-thread-streams 0 "$SNAP" "dst:${BUCKET}/$KEY"
if ! rclone lsf "dst:${BUCKET}/" | grep -q "^$KEY$"; then
  echo "ERROR: uploaded snapshot not found in destination listing" >&2
  exit 1
fi
echo "landed: dst:${BUCKET}/$KEY"
echo "pruning dst:${BUCKET} older than ${RETENTION_DAYS}d"
rclone delete "dst:${BUCKET}" --min-age ${RETENTION_DAYS}d --use-server-modtime --stats-one-line -v
echo "retention prune complete"`
}

const HARDENED_SECURITY_CONTEXT = {
  runAsNonRoot: true,
  runAsUser: 1000,
  readOnlyRootFilesystem: true,
  allowPrivilegeEscalation: false,
  capabilities: { drop: ["ALL"] },
} as const

const CONTAINER_RESOURCES = {
  requests: { cpu: "100m", memory: "256Mi" },
  limits: { memory: "256Mi" },
} as const

export function etcdSnapshotCronJobYaml(): string {
  const name = "etcd-snapshot"
  return synthOne(NAMESPACE, name, {
    apiVersion: "batch/v1",
    kind: "CronJob",
    metadata: { name, namespace: NAMESPACE, labels: LABELS },
    spec: {
      schedule: "17 3 * * *",
      concurrencyPolicy: "Forbid",
      startingDeadlineSeconds: 300,
      successfulJobsHistoryLimit: 3,
      failedJobsHistoryLimit: 3,
      jobTemplate: {
        spec: {
          backoffLimit: 2,
          activeDeadlineSeconds: 1800,
          ttlSecondsAfterFinished: 3600,
          template: {
            metadata: { labels: LABELS },
            spec: {
              restartPolicy: "Never",
              securityContext: {
                fsGroup: 1000,
                seccompProfile: { type: "RuntimeDefault" },
              },
              initContainers: [
                {
                  name: "snapshot",
                  image: TALOSCTL_IMAGE,
                  args: ["etcd", "snapshot", SNAPSHOT_PATH, "-e", TARGET_NODE, "-n", TARGET_NODE],
                  env: [
                    { name: "TALOSCONFIG", value: TALOSCONFIG_PATH },
                    { name: "HOME", value: "/var/tmp" },
                  ],
                  volumeMounts: [
                    { name: "talosconfig", mountPath: "/talos", readOnly: true },
                    { name: "snapshot", mountPath: "/snapshot" },
                    { name: "tmp", mountPath: "/var/tmp" },
                  ],
                  securityContext: HARDENED_SECURITY_CONTEXT,
                  resources: CONTAINER_RESOURCES,
                },
              ],
              containers: [
                {
                  name: "upload",
                  image: RCLONE_IMAGE,
                  command: ["/bin/sh", "-c", uploadScript()],
                  env: rcloneEnv(),
                  volumeMounts: [
                    { name: "snapshot", mountPath: "/snapshot", readOnly: true },
                    { name: "tmp", mountPath: "/var/tmp" },
                  ],
                  securityContext: HARDENED_SECURITY_CONTEXT,
                  resources: CONTAINER_RESOURCES,
                },
              ],
              volumes: [
                {
                  name: "talosconfig",
                  secret: { secretName: TALOSCONFIG_SECRET },
                },
                { name: "snapshot", emptyDir: { sizeLimit: "1Gi" } },
                { name: "tmp", emptyDir: { sizeLimit: "256Mi" } },
              ],
            },
          },
        },
      },
    },
  })
}
