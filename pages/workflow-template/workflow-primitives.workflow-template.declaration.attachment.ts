import { IMAGES } from "../../tools/lib/workflow-dsl/images"
import { step } from "../../tools/lib/workflow-dsl/step"
import { workflow } from "../../tools/lib/workflow-dsl/workflow"

const RUNTIME_CLASS_MANIFEST =
  "packages/infra/k8s/src/primitives/generated/nvidia-runtime-class.generated.yaml"
const NVIDIA_MANIFEST =
  "packages/infra/k8s/src/primitives/generated/nvidia-daemonset.generated.yaml"

const primitivesBootstrap = workflow("primitives", {
  kind: "foundation",
  dependsOn: ["preparation"],
  when: { branch: "main", event: "push" },
  dispatchNodes: [
    "workflow:instructions:primitives",
    "ts-file:code:packages/infra/k8s/src/primitives/synth.ts",
  ],
  steps: [
    step({
      name: "primitives-apply-runtime-class",
      image: IMAGES.KUBECTL_PUBLIC,

      environment: { HOME: "/tmp" },
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

      environment: { HOME: "/tmp" },
      commands: ["set -e", `kubectl apply --server-side --force-conflicts -f ${NVIDIA_MANIFEST}`],
      backendOptions: {
        kubernetes: { serviceAccountName: "pipeline-engine" },
      },
    }),
  ],
})

export const workflows = [primitivesBootstrap]
