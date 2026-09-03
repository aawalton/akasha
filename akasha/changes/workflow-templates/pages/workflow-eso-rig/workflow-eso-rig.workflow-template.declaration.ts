import { IMAGES } from "@akasha/workflow-language/images"
import { kubectlApply } from "@akasha/workflow-language/kubectl-apply"
import { applyRbac } from "@akasha/workflow-language/rbac-apply"
import { step } from "@akasha/workflow-language/step"
import { verifyRolloutCommands } from "@akasha/workflow-language/verify-rollout"
import { workflow } from "@akasha/workflow-language/workflow"

const SKIP_CHECK = [
  "CURRENT_HASH=$(kubectl get configmap eso-rig-pipeline-state -n eso-rig -o jsonpath='{.metadata.annotations.pipeline\\.alanwalton\\.com/content-hash}' 2>/dev/null || echo \"\")",
  'if [ "$CURRENT_HASH" = "$CONTENT_HASH" ]; then echo "Content hash unchanged, skipping"; exit 0; fi',
]

export default workflow("eso-rig", {
  kind: "foundation",
  dependsOn: ["preparation"],
  when: { branch: "main", event: "push" },
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
        rbacFile:
          "akasha/infrastructure/cluster-manifests/eso-rig-rbac/eso-rig-rbac.module.code.ts",
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
