import { IMAGES } from "@akasha/workflow-language/images"
import { step } from "@akasha/workflow-language/step"
import { workflow } from "@akasha/workflow-language/workflow"

const RUNTIME_CLASS_MANIFEST =
  "infra/k8s/src/nvidia-device-plugin/generated/nvidia-runtime-class.generated.yaml"
const NVIDIA_MANIFEST =
  "infra/k8s/src/nvidia-device-plugin/generated/nvidia-daemonset.generated.yaml"

const primitivesBootstrap = workflow("primitives", {
  kind: "foundation",
  dependsOn: ["preparation"],
  when: { branch: "main", event: "push" },
  steps: [
    step({
      name: "primitives-apply-runtime-class",
      image: IMAGES.KUBECTL_PUBLIC,

      environment: { HOME: "/var/tmp" },
      commands: [
        "set -e",
        `kubectl apply --server-side --force-conflicts -f ${RUNTIME_CLASS_MANIFEST}`,
      ],
      backendOptions: {
        kubernetes: { serviceAccountName: "pipeline-engine" },
      },
    }),
    step({
      name: "primitives-apply-nvidia",
      image: IMAGES.KUBECTL_PUBLIC,

      environment: { HOME: "/var/tmp" },
      commands: ["set -e", `kubectl apply --server-side --force-conflicts -f ${NVIDIA_MANIFEST}`],
      backendOptions: {
        kubernetes: { serviceAccountName: "pipeline-engine" },
      },
    }),
  ],
})

export const workflows = [primitivesBootstrap]
