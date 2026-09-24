import { synthOne } from "akasha/infrastructure/cluster/k8s-type/modules/cdk8s-synth/cdk8s-synth.module.code.ts"
import { resourcesOf } from "akasha/infrastructure/cluster/k8s-type/modules/container-resources/container-resources.module.code.ts"
import { dcgmExporterDaemonset } from "akasha/infrastructure/service/akasha-service/service-cluster/pages/dcgm-exporter-daemonset/dcgm-exporter-daemonset.service-cluster.ts"
import { dcgmExporterDaemonset as page } from "akasha/infrastructure/telemetry/dcgm-exporter-daemonset/dcgm-exporter-daemonset.manifest.ts"
import {
  DCGM_EXPORTER_LABELS,
  DCGM_EXPORTER_SELECTOR_LABELS,
  KUBE_SYSTEM_NAMESPACE,
} from "akasha/infrastructure/telemetry/modules/prometheus-constants/prometheus-constants.module.code.ts"

function dcgmExporterDaemonsetYaml(): string {
  return synthOne(KUBE_SYSTEM_NAMESPACE, "dcgm-exporter-daemonset", {
    apiVersion: "apps/v1",
    kind: dcgmExporterDaemonset.resourceKind,
    metadata: {
      name: dcgmExporterDaemonset.resourceName,
      namespace: dcgmExporterDaemonset.namespace,
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
              image: dcgmExporterDaemonset.image,
              ports: [
                {
                  name: "metrics",
                  containerPort: dcgmExporterDaemonset.containerPort,
                  hostPort: dcgmExporterDaemonset.containerPort,
                },
              ],
              env: [
                { name: "NVIDIA_VISIBLE_DEVICES", value: "all" },
                { name: "NVIDIA_DRIVER_CAPABILITIES", value: "all" },
              ],
              resources: resourcesOf(page),
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
