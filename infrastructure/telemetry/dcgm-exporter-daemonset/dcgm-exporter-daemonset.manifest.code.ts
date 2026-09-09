import { synthOne } from "akasha/infrastructure/cluster/k8s-types/cdk8s-synth/cdk8s-synth.module.code.ts"
import {
  DCGM_EXPORTER_IMAGE,
  DCGM_EXPORTER_LABELS,
  DCGM_EXPORTER_SELECTOR_LABELS,
  KUBE_SYSTEM_NAMESPACE,
} from "../prometheus-constants/prometheus-constants.module.code.ts"

function dcgmExporterDaemonsetYaml(): string {
  return synthOne(KUBE_SYSTEM_NAMESPACE, "dcgm-exporter-daemonset", {
    apiVersion: "apps/v1",
    kind: "DaemonSet",
    metadata: {
      name: "dcgm-exporter",
      namespace: KUBE_SYSTEM_NAMESPACE,
      labels: DCGM_EXPORTER_LABELS,
    },
    spec: {
      selector: { matchLabels: DCGM_EXPORTER_SELECTOR_LABELS },
      updateStrategy: {
        type: "RollingUpdate",
        rollingUpdate: { maxUnavailable: 1 },
      },
      template: {
        metadata: { labels: DCGM_EXPORTER_LABELS },
        spec: {
          nodeSelector: { "nvidia.com/gpu.present": "true" },
          runtimeClassName: "nvidia",
          containers: [
            {
              name: "dcgm-exporter",
              image: DCGM_EXPORTER_IMAGE,
              ports: [{ name: "metrics", containerPort: 9400, hostPort: 9400 }],
              env: [
                { name: "NVIDIA_VISIBLE_DEVICES", value: "all" },
                { name: "NVIDIA_DRIVER_CAPABILITIES", value: "all" },
              ],
              resources: {
                requests: { cpu: "5m", memory: "576Mi" },
                limits: { memory: "576Mi" },
              },
              securityContext: { privileged: true },
              volumeMounts: [
                {
                  name: "pod-resources",
                  mountPath: "/var/lib/kubelet/pod-resources",
                  readOnly: true,
                },
              ],
            },
          ],
          tolerations: [{ operator: "Exists" }],
          volumes: [
            {
              name: "pod-resources",
              hostPath: { path: "/var/lib/kubelet/pod-resources" },
            },
          ],
        },
      },
    },
  })
}

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [{ name: "dcgm-exporter-daemonset", yaml: dcgmExporterDaemonsetYaml() }]
}
