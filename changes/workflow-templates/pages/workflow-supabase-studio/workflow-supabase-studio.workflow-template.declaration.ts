import { IMAGES } from "@akasha/workflow-language/images"
import { kubectlApply } from "@akasha/workflow-language/kubectl-apply"
import { applyRbac } from "@akasha/workflow-language/rbac-apply"
import { step } from "@akasha/workflow-language/step"
import { verifyRolloutCommands } from "@akasha/workflow-language/verify-rollout"
import { workflow } from "@akasha/workflow-language/workflow"

const SKIP_CHECK = [
  "CURRENT_HASH=$(kubectl get configmap supabase-studio-pipeline-state -n supabase-studio -o jsonpath='{.metadata.annotations.pipeline\\.alanwalton\\.com/content-hash}' 2>/dev/null || echo \"\")",
  'if [ "$CURRENT_HASH" = "$CONTENT_HASH" ]; then echo "Content hash unchanged, skipping"; exit 0; fi',
]

export default workflow("supabase-studio", {
  kind: "foundation",
  dependsOn: ["postgres", "preparation"],
  when: { branch: "main", event: "push" },
  steps: [
    kubectlApply({
      name: "supabase-studio-apply-namespace",
      namespace: "supabase-studio",
      files: "infra/k8s/src/supabase-studio/generated/namespace.generated.yaml",
      serverSide: true,
    }),

    {
      ...applyRbac({
        name: "supabase-studio-apply-rbac",
        rbacFile:
          "infrastructure/cluster-manifests/supabase-studio-rbac/supabase-studio-rbac.module.code.ts",
      }),
      dependsOn: ["supabase-studio-apply-namespace"],
    },

    {
      ...step({
        name: "supabase-studio-apply-manifests",
        image: IMAGES.KUBECTL,
        environment: { HOME: "/var/tmp" },
        commands: (ci) => [
          "set -e",
          `CONTENT_HASH="${ci.inputsHash}"`,
          ...SKIP_CHECK,
          "kubectl apply --server-side --force-conflicts -n supabase-studio -f infra/k8s/src/supabase-studio/generated/service.generated.yaml",
          "kubectl apply --server-side --force-conflicts -n supabase-studio -f infra/k8s/src/supabase-studio/generated/deployment.generated.yaml",
          ...verifyRolloutCommands({
            namespace: "supabase-studio",
            deployment: "supabase-studio",
            timeout: "180s",
          }),
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["supabase-studio-apply-rbac"],
    },

    {
      ...step({
        name: "supabase-studio-stamp-content-hash",
        image: IMAGES.KUBECTL,
        environment: { HOME: "/var/tmp" },
        commands: (ci) => [
          "set -e",
          "kubectl create configmap supabase-studio-pipeline-state -n supabase-studio --dry-run=client -o yaml | kubectl apply -f -",
          `kubectl annotate configmap supabase-studio-pipeline-state -n supabase-studio pipeline.alanwalton.com/content-hash=${ci.inputsHash} --overwrite`,
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["supabase-studio-apply-manifests"],
    },
  ],
})
