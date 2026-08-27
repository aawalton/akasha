import { step } from "../../tools/lib/workflow-dsl/step"
import { checksumHashCommands } from "../../tools/lib/workflow-dsl/templates/checksum-hash"
import { verifyRolloutCommands } from "../../tools/lib/workflow-dsl/templates/verify-rollout"
import { workflow } from "../../tools/lib/workflow-dsl/workflow"

const PUBLIC_KUBECTL =
  "bitnami/kubectl@sha256:6e2cdb22d6ab7264ea198c717f555e30536b54029d26c8781b9f25f78951b564"

export default workflow("buildkit", {
  kind: "foundation",
  dependsOn: ["preparation"],
  when: { branch: "main", event: "push" },
  dispatchNodes: [
    "workflow:instructions:buildkit",
    "k8s-resource:code:Namespace//buildkit",
    "k8s-resource:code:ConfigMap//buildkit-config",
    "k8s-resource:code:Deployment//buildkit",
    "k8s-resource:code:Service//buildkit",
    "k8s-resource:code:CronJob//buildkit-prune",
  ],
  steps: [
    step({
      name: "buildkit-apply-namespace",
      image: PUBLIC_KUBECTL,
      environment: { HOME: "/tmp" },
      commands: [
        "set -e",
        "kubectl apply --server-side --force-conflicts -f packages/infra/k8s/src/buildkit/generated/namespace.generated.yaml",
      ],
      backendOptions: {
        kubernetes: { serviceAccountName: "pipeline-engine" },
      },
    }),
    step({
      name: "buildkit-apply",
      image: PUBLIC_KUBECTL,
      shell: ["/ci-storage/tools/bash", "-c"],
      environment: { HOME: "/tmp" },
      commands: [
        "set -e",
        "kubectl apply --server-side --force-conflicts -n buildkit -f packages/infra/k8s/src/buildkit/generated/configmap.generated.yaml",
        "kubectl apply --server-side --force-conflicts -n buildkit -f packages/infra/k8s/src/buildkit/generated/service.generated.yaml",
        "kubectl apply --server-side --force-conflicts -n buildkit -f packages/infra/k8s/src/buildkit/generated/prune-cronjob.generated.yaml",
        ...checksumHashCommands({
          variable: "CONFIG_HASH",
          read: "cat packages/infra/k8s/src/buildkit/generated/configmap.generated.yaml",
          subject: "buildkit configmap.generated.yaml",
        }),
        'sed "s|checksum/config:.*|checksum/config: \\"${CONFIG_HASH}\\"|" packages/infra/k8s/src/buildkit/generated/deployment.generated.yaml \\',
        "  | kubectl apply -n buildkit -f -",
        ...verifyRolloutCommands({ namespace: "buildkit", deployment: "buildkit" }),
      ],
      dependsOn: ["buildkit-apply-namespace"],
      backendOptions: {
        kubernetes: { serviceAccountName: "pipeline-engine" },
      },
    }),
  ],
})
