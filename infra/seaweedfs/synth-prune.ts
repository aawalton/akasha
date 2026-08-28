import { synthOne } from "@infra/k8s-types/cdk8s-synth"
import { capabilitySelector } from "@infra/k8s-types/hostnames"
import {
  ASSETS_BUCKET,
  componentLabels,
  EXPIRING_PREFIXES,
  S3_GATEWAY_ENDPOINT,
} from "./synth-constants.ts"

const RCLONE_IMAGE = "rclone/rclone:1.74.3"

const SRC_SECRET = "seaweedfs-creds"

export const PRUNE_NAMESPACE = "seaweedfs-prune-sessions"

export const COMPONENT_PRUNE = "prune"

export const RETENTION_DAYS = 30

const PRUNE_PATH = `src:${ASSETS_BUCKET}/${EXPIRING_PREFIXES[0]}`

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

function pruneScript(): string {
  return [
    "set -eu",
    `echo "rclone $(rclone version | head -n1) pruning ${PRUNE_PATH} older than ${RETENTION_DAYS}d"`,
    `rclone delete "${PRUNE_PATH}" \\`,
    `  --min-age ${RETENTION_DAYS}d \\`,
    "  --use-server-modtime \\",
    "  --checkers 8 \\",
    "  --stats-one-line \\",
    "  --stats 30s \\",
    "  -v",
    'echo "prune complete"',
  ].join("\n")
}

export function pruneSessionsCronJobYaml(): string {
  const name = "seaweedfs-prune-sessions"
  const labels = componentLabels(COMPONENT_PRUNE)
  return synthOne(PRUNE_NAMESPACE, name, {
    apiVersion: "batch/v1",
    kind: "CronJob",
    metadata: { name, namespace: PRUNE_NAMESPACE, labels },
    spec: {
      schedule: "24 5 * * *",
      concurrencyPolicy: "Forbid",
      startingDeadlineSeconds: 300,
      successfulJobsHistoryLimit: 1,
      failedJobsHistoryLimit: 3,
      jobTemplate: {
        spec: {
          backoffLimit: 2,
          activeDeadlineSeconds: 3600,
          ttlSecondsAfterFinished: 3600,
          template: {
            metadata: { labels },
            spec: {
              restartPolicy: "Never",
              nodeSelector: capabilitySelector("serve"),
              securityContext: { seccompProfile: { type: "RuntimeDefault" } },
              containers: [
                {
                  name: "rclone-prune",
                  image: RCLONE_IMAGE,
                  command: ["/bin/sh", "-c", pruneScript()],
                  env: rcloneEnv(),
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
