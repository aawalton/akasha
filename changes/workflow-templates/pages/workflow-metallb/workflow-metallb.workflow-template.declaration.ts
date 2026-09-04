import { IMAGES } from "@akasha/workflow-language/images"
import { applyRbac } from "@akasha/workflow-language/rbac-apply"
import { step } from "@akasha/workflow-language/step"
import { workflow } from "@akasha/workflow-language/workflow"

const SKIP_CHECK = [
  "CURRENT_HASH=$(kubectl get configmap metallb-pipeline-state -n metallb-system -o jsonpath='{.metadata.annotations.pipeline\\.alanwalton\\.com/content-hash}' 2>/dev/null || echo \"\")",
  'if [ "$CURRENT_HASH" = "$CONTENT_HASH" ]; then echo "Content hash unchanged, skipping"; exit 0; fi',
]

export default workflow("metallb", {
  kind: "foundation",
  dependsOn: ["preparation"],
  when: { branch: "main", event: "push" },
  steps: [
    applyRbac({
      name: "metallb-apply-rbac",
      rbacFile: "infrastructure/cluster-manifests/metallb-rbac/metallb-rbac.module.code.ts",
    }),
    {
      ...step({
        name: "metallb-apply-ip-pool",
        image: IMAGES.KUBECTL,
        environment: { HOME: "/tmp" },
        commands: (ci) => [
          "set -e",
          `CONTENT_HASH="${ci.inputsHash}"`,
          ...SKIP_CHECK,
          `kubectl apply --server-side --force-conflicts -f ${ci.workspace}/infra/k8s/src/metallb/generated/ip-pool.generated.yaml`,
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["metallb-apply-rbac"],
    },
    {
      ...step({
        name: "metallb-stamp-content-hash",
        image: IMAGES.KUBECTL,
        environment: { HOME: "/tmp" },
        commands: (ci) => [
          "set -e",
          "kubectl create configmap metallb-pipeline-state -n metallb-system --dry-run=client -o yaml | kubectl apply -f -",
          `kubectl annotate configmap metallb-pipeline-state -n metallb-system pipeline.alanwalton.com/content-hash=${ci.inputsHash} --overwrite`,
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["metallb-apply-ip-pool"],
    },
  ],
})
