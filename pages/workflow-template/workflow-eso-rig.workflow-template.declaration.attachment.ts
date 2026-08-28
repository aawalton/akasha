import { IMAGES } from "../../tools/lib/workflow-dsl/images"
import { step } from "../../tools/lib/workflow-dsl/step"
import { kubectlApply } from "../../tools/lib/workflow-dsl/templates/kubectl-apply"
import { applyRbac } from "../../tools/lib/workflow-dsl/templates/rbac-apply"
import { verifyRolloutCommands } from "../../tools/lib/workflow-dsl/templates/verify-rollout"
import { workflow } from "../../tools/lib/workflow-dsl/workflow"

const SKIP_CHECK = [
  "CURRENT_HASH=$(kubectl get configmap eso-rig-pipeline-state -n eso-rig -o jsonpath='{.metadata.annotations.pipeline\\.alanwalton\\.com/content-hash}' 2>/dev/null || echo \"\")",
  'if [ "$CURRENT_HASH" = "$CONTENT_HASH" ]; then echo "Content hash unchanged, skipping"; exit 0; fi',
]

export default workflow("eso-rig", {
  kind: "foundation",
  dependsOn: ["preparation"],
  when: { branch: "main", event: "push" },
  dispatchNodes: [
    "workflow:instructions:eso-rig",
    "ts-file:instructions:tools/lib/rbac/eso-rig.ts",
    "ts-file:code:packages/infra/eso-rig/k8s/synth.ts",
  ],
  steps: [
    kubectlApply({
      name: "eso-rig-apply-namespace",
      namespace: "eso-rig",
      files: "infra/eso-rig/generated/namespace.generated.yaml",
      serverSide: true,
    }),

    {
      ...applyRbac({
        name: "eso-rig-apply-rbac",
        rbacFile: "tools/lib/rbac/eso-rig.ts",
      }),
      dependsOn: ["eso-rig-apply-namespace"],
    },

    {
      ...step({
        name: "eso-rig-apply-manifests",
        image: IMAGES.KUBECTL,
        environment: { HOME: "/tmp" },
        commands: (ci) => [
          "set -e",
          `CONTENT_HASH="${ci.inputsHash}"`,
          ...SKIP_CHECK,
          "kubectl apply --server-side --force-conflicts -n eso-rig -f infra/eso-rig/generated/deployment.generated.yaml",
          ...verifyRolloutCommands({
            namespace: "eso-rig",
            deployment: "eso-rig",
            timeout: "300s",
          }),
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["eso-rig-apply-rbac"],
    },

    {
      ...step({
        name: "eso-rig-stamp-content-hash",
        image: IMAGES.KUBECTL,
        environment: { HOME: "/tmp" },
        commands: (ci) => [
          "set -e",
          "kubectl create configmap eso-rig-pipeline-state -n eso-rig --dry-run=client -o yaml | kubectl apply -f -",
          `kubectl annotate configmap eso-rig-pipeline-state -n eso-rig pipeline.alanwalton.com/content-hash=${ci.inputsHash} --overwrite`,
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["eso-rig-apply-manifests"],
    },
  ],
})
