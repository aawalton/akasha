import { step } from "../../tools/lib/workflow-dsl/step"
import { sopsDecryptApply } from "../../tools/lib/workflow-dsl/templates/sops-decrypt"
import { verifyRolloutCommands } from "../../tools/lib/workflow-dsl/templates/verify-rollout"
import { workflow } from "../../tools/lib/workflow-dsl/workflow"

const PUBLIC_KUBECTL =
  "bitnami/kubectl@sha256:6e2cdb22d6ab7264ea198c717f555e30536b54029d26c8781b9f25f78951b564"

export default workflow("registry", {
  kind: "foundation",
  dependsOn: ["preparation"],
  when: { branch: "main", event: "push" },
  steps: [
    step({
      name: "registry-apply-namespaces",
      image: PUBLIC_KUBECTL,
      environment: { HOME: "/tmp" },
      commands: [
        "set -e",
        "kubectl apply --server-side --force-conflicts -f infra/k8s/src/registry/generated/namespace.generated.yaml",
      ],
      backendOptions: {
        kubernetes: { serviceAccountName: "pipeline-engine" },
      },
    }),
    step({
      name: "registry-apply",
      image: PUBLIC_KUBECTL,
      environment: { HOME: "/tmp" },
      commands: [
        "set -e",
        "kubectl apply --server-side --force-conflicts -f infra/k8s/src/registry/generated/pv.generated.yaml",
        "kubectl apply --server-side --force-conflicts -n registry -f infra/k8s/src/registry/generated/pvc.generated.yaml",
        "kubectl apply --server-side --force-conflicts -n registry -f infra/k8s/src/registry/generated/deployment.generated.yaml",
        "kubectl apply --server-side --force-conflicts -n registry -f infra/k8s/src/registry/generated/service.generated.yaml",
        "kubectl apply --server-side --force-conflicts -n registry -f infra/k8s/src/registry/registry-gc/generated/cronjob-gc.generated.yaml",
        ...verifyRolloutCommands({ namespace: "registry", deployment: "registry" }),
      ],
      dependsOn: ["registry-apply-namespaces"],
      backendOptions: {
        kubernetes: { serviceAccountName: "pipeline-engine" },
      },
    }),
    {
      ...sopsDecryptApply({
        name: "registry-apply-tls",
        namespace: "registry",
        secretFile: "infra/k8s/src/registry/secrets/registry-tls.sops.yaml",
      }),
      dependsOn: ["registry-apply"],
    },
  ],
})
