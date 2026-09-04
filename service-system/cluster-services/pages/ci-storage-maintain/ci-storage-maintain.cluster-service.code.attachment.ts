import {
  ciStorageScriptsConfigMapYaml,
  NAMESPACE,
  podLabels,
  resourceLabels,
} from "@akasha/cluster-manifests/ci-storage-scripts"
import { synthOne } from "@akasha/k8s-types/cdk8s-synth"
import { workloadClassMemberSelector } from "@akasha/k8s-types/hostnames"

const MAINTAIN_LOOP =
  "apk add --no-cache git curl >/dev/null 2>&1 && while true; do timeout 1800 env RUN_HOUSEKEEPING=1 sh /opt/bin/prune-ci-storage.sh || exit 1; sleep 21600; done"

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
    { name: "ci-storage-maintain-daemonset", yaml: ciStorageMaintainDaemonsetYaml() },
  ]
}
