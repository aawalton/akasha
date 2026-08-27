import { synthOne } from "@infra/k8s-types/cdk8s-synth"
import { workloadClassMemberSelector } from "@infra/k8s-types/hostnames"
import { PRUNE_CI_STORAGE_SCRIPT } from "./prune-ci-storage-script"

const NAMESPACE = "ci"
const INSTANCE_NAME = "infra"
const COMPONENT = "gc"
const PART_OF = "ci-tools"
const MANAGED_BY = "deploy-script"

function resourceLabels(appName: string) {
  return {
    "app.kubernetes.io/name": appName,
    "app.kubernetes.io/instance": INSTANCE_NAME,
    "app.kubernetes.io/component": COMPONENT,
    "app.kubernetes.io/part-of": PART_OF,
    "app.kubernetes.io/managed-by": MANAGED_BY,
  } as const
}

function podLabels(appName: string) {
  return {
    "app.kubernetes.io/name": appName,
    "app.kubernetes.io/instance": INSTANCE_NAME,
    "app.kubernetes.io/component": COMPONENT,
  } as const
}

const ADMIN_BOOT = "apk add --no-cache git curl >/dev/null 2>&1 && sleep infinity"
const MAINTAIN_LOOP =
  "apk add --no-cache git curl >/dev/null 2>&1 && while true; do timeout 1800 env RUN_HOUSEKEEPING=1 sh /opt/bin/prune-ci-storage.sh || exit 1; sleep 21600; done"

function ciStorageScriptsConfigMapYaml(): string {
  return synthOne(NAMESPACE, "ci-storage-scripts", {
    apiVersion: "v1",
    kind: "ConfigMap",
    metadata: {
      name: "ci-storage-scripts",
      namespace: NAMESPACE,
      labels: resourceLabels("ci-storage-scripts"),
    },
    data: {
      "prune-ci-storage.sh": PRUNE_CI_STORAGE_SCRIPT,
    },
  })
}

function ciStorageAdminDeploymentYaml(): string {
  return synthOne(NAMESPACE, "ci-storage-admin", {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: "ci-storage-admin",
      namespace: NAMESPACE,
      labels: resourceLabels("ci-storage-admin"),
    },
    spec: {
      replicas: 1,
      strategy: { type: "Recreate" },
      selector: { matchLabels: podLabels("ci-storage-admin") },
      template: {
        metadata: { labels: podLabels("ci-storage-admin") },
        spec: {
          nodeSelector: workloadClassMemberSelector("ci"),
          restartPolicy: "Always",
          volumes: [
            {
              name: "ci-storage",
              hostPath: { path: "/var/lib/ci-storage", type: "DirectoryOrCreate" },
            },
            {
              name: "scripts",
              configMap: { name: "ci-storage-scripts", defaultMode: 0o755 },
            },
          ],
          containers: [
            {
              name: "admin",
              image: "alpine:3.21",
              command: ["sh", "-c", ADMIN_BOOT],
              volumeMounts: [
                { name: "ci-storage", mountPath: "/ci-storage" },
                { name: "scripts", mountPath: "/opt/bin" },
              ],
              resources: {
                requests: { cpu: "10m", memory: "256Mi" },
                limits: { memory: "256Mi" },
              },
            },
          ],
        },
      },
    },
  })
}

function ciStorageMaintainDaemonsetYaml(): string {
  return synthOne(NAMESPACE, "ci-storage-maintain", {
    apiVersion: "apps/v1",
    kind: "DaemonSet",
    metadata: {
      name: "ci-storage-maintain",
      namespace: NAMESPACE,
      labels: resourceLabels("ci-storage-maintain"),
    },
    spec: {
      selector: { matchLabels: podLabels("ci-storage-maintain") },
      updateStrategy: {
        type: "RollingUpdate",
        rollingUpdate: { maxUnavailable: 1 },
      },
      template: {
        metadata: { labels: podLabels("ci-storage-maintain") },
        spec: {
          nodeSelector: workloadClassMemberSelector("ci"),
          restartPolicy: "Always",
          volumes: [
            {
              name: "ci-storage",
              hostPath: { path: "/var/lib/ci-storage", type: "DirectoryOrCreate" },
            },
            {
              name: "scripts",
              configMap: { name: "ci-storage-scripts", defaultMode: 0o755 },
            },
          ],
          containers: [
            {
              name: "maintain",
              image: "alpine:3.21",
              command: ["sh", "-c", MAINTAIN_LOOP],
              volumeMounts: [
                { name: "ci-storage", mountPath: "/ci-storage" },
                { name: "scripts", mountPath: "/opt/bin" },
              ],
              resources: {
                requests: { cpu: "200m", memory: "2048Mi" },
                limits: { memory: "2048Mi" },
              },
            },
          ],
        },
      },
    },
  })
}

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "ci-storage-scripts-configmap", yaml: ciStorageScriptsConfigMapYaml() },
    { name: "ci-storage-admin-deployment", yaml: ciStorageAdminDeploymentYaml() },
    { name: "ci-storage-maintain-daemonset", yaml: ciStorageMaintainDaemonsetYaml() },
  ]
}
