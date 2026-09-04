import { synthOne } from "@akasha/k8s-types/cdk8s-synth"

const NVIDIA_NAMESPACE = "kube-system"
const NVIDIA_DAEMONSET_NAME = "nvidia-device-plugin-daemonset"
const NVIDIA_DS_LABEL = "nvidia-device-plugin-ds"
const NVIDIA_RUNTIME_CLASS_NAME = "nvidia"

function runtimeClassYaml(): string {
  return synthOne("primitives-nvidia-runtime", "runtime-class", {
    apiVersion: "node.k8s.io/v1",
    kind: "RuntimeClass",
    metadata: { name: NVIDIA_RUNTIME_CLASS_NAME },
    handler: NVIDIA_RUNTIME_CLASS_NAME,
  })
}

function nvidiaDaemonsetYaml(): string {
  return synthOne("primitives-nvidia", "daemonset", {
    apiVersion: "apps/v1",
    kind: "DaemonSet",
    metadata: {
      name: NVIDIA_DAEMONSET_NAME,
      namespace: NVIDIA_NAMESPACE,
      labels: {
        "app.kubernetes.io/name": "nvidia-device-plugin",
        "app.kubernetes.io/managed-by": "deploy-script",
      },
    },
    spec: {
      selector: {
        matchLabels: { name: NVIDIA_DS_LABEL },
      },
      updateStrategy: { type: "RollingUpdate" },
      template: {
        metadata: {
          labels: { name: NVIDIA_DS_LABEL },
        },
        spec: {
          runtimeClassName: "nvidia",
          priorityClassName: "system-node-critical",
          nodeSelector: {
            "nvidia.com/gpu.present": "true",
          },
          tolerations: [
            {
              key: "nvidia.com/gpu",
              operator: "Exists",
              effect: "NoSchedule",
            },
          ],
          containers: [
            {
              name: "nvidia-device-plugin-ctr",
              image: "nvcr.io/nvidia/k8s-device-plugin:v0.14.5",
              env: [{ name: "FAIL_ON_INIT_ERROR", value: "false" }],
              securityContext: {
                allowPrivilegeEscalation: false,
                capabilities: { drop: ["ALL"] },
              },
              resources: {
                requests: { cpu: "5m", memory: "64Mi" },
                limits: { memory: "64Mi" },
              },
              volumeMounts: [
                {
                  name: "device-plugin",
                  mountPath: "/var/lib/kubelet/device-plugins",
                },
              ],
            },
          ],
          volumes: [
            {
              name: "device-plugin",
              hostPath: { path: "/var/lib/kubelet/device-plugins" },
            },
          ],
        },
      },
    },
  })
}

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "nvidia-runtime-class", yaml: runtimeClassYaml() },
    { name: "nvidia-daemonset", yaml: nvidiaDaemonsetYaml() },
  ]
}
