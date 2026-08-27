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
  dispatchNodes: [
    "workflow:instructions:registry",
    "ts-file:code:packages/infra/k8s/src/registry/synth-constants.ts",
    "k8s-resource:code:Namespace//registry",
    "k8s-resource:code:PersistentVolumeClaim//registry-data",
    "k8s-resource:code:Deployment//registry",
    "k8s-resource:code:Service//registry",
    "k8s-resource:code:ServiceAccount/registry/registry-gc",
    "k8s-resource:code:Role/registry/registry-gc",
    "k8s-resource:code:RoleBinding/registry/registry-gc",
    "k8s-resource:code:CronJob/registry/registry-gc",
    "yaml-file:code:packages/infra/k8s/src/registry/secrets/registry-tls.sops.yaml",
  ],
  steps: [
    step({
      name: "registry-apply-namespaces",
      image: PUBLIC_KUBECTL,
      environment: { HOME: "/tmp" },
      commands: [
        "set -e",
        "kubectl apply --server-side --force-conflicts -f packages/infra/k8s/src/registry/generated/namespace.generated.yaml",
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
        "kubectl apply --server-side --force-conflicts -f packages/infra/k8s/src/registry/generated/pv.generated.yaml",
        "kubectl apply --server-side --force-conflicts -n registry -f packages/infra/k8s/src/registry/generated/pvc.generated.yaml",
        "kubectl apply --server-side --force-conflicts -n registry -f packages/infra/k8s/src/registry/generated/deployment.generated.yaml",
        "kubectl apply --server-side --force-conflicts -n registry -f packages/infra/k8s/src/registry/generated/service.generated.yaml",
        "kubectl apply --server-side --force-conflicts -n registry -f packages/infra/k8s/src/registry/generated/cronjob-gc.generated.yaml",
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
        secretFile: "packages/infra/k8s/src/registry/secrets/registry-tls.sops.yaml",
      }),
      dependsOn: ["registry-apply"],
    },
  ],
})
