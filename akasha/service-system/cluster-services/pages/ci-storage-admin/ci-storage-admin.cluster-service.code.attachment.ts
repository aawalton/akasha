import {
  ciStorageScriptsConfigMapYaml,
  NAMESPACE,
  podLabels,
  resourceLabels,
} from "@akasha/cluster-manifests/ci-storage-scripts-synth"
import { synthOne } from "@akasha/k8s-types/cdk8s-synth"
import { workloadClassMemberSelector } from "@akasha/k8s-types/hostnames"

const ADMIN_BOOT = "apk add --no-cache git curl >/dev/null 2>&1 && sleep infinity"

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

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "ci-storage-scripts-configmap", yaml: ciStorageScriptsConfigMapYaml() },
    { name: "ci-storage-admin-deployment", yaml: ciStorageAdminDeploymentYaml() },
  ]
}
