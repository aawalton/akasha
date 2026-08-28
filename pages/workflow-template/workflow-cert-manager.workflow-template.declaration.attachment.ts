import { IMAGES } from "../../tools/lib/workflow-dsl/images"
import { step } from "../../tools/lib/workflow-dsl/step"
import { applyRbac } from "../../tools/lib/workflow-dsl/templates/rbac-apply"
import { sopsDecryptApply } from "../../tools/lib/workflow-dsl/templates/sops-decrypt"
import { workflow } from "../../tools/lib/workflow-dsl/workflow"

const SKIP_CHECK = [
  "CURRENT_HASH=$(kubectl get configmap cert-manager-pipeline-state -n cert-manager -o jsonpath='{.metadata.annotations.pipeline\\.alanwalton\\.com/content-hash}' 2>/dev/null || echo \"\")",
  'if [ "$CURRENT_HASH" = "$CONTENT_HASH" ]; then echo "Content hash unchanged, skipping"; exit 0; fi',
]

export default workflow("cert-manager", {
  kind: "foundation",
  dependsOn: ["preparation"],
  when: { branch: "main", event: "push" },
  steps: [
    applyRbac({
      name: "cert-manager-apply-rbac",
      rbacFile: "tools/lib/rbac/cert-manager.ts",
    }),
    {
      ...sopsDecryptApply({
        name: "cert-manager-apply-cloudflare-token",
        namespace: "cert-manager",
        secretFile: "infra/k8s/src/cert-manager/cloudflare-api-token.k8s-secret.sops.yaml",
      }),
      dependsOn: ["cert-manager-apply-rbac"],
    },
    {
      ...step({
        name: "cert-manager-apply-cluster-issuer",
        image: IMAGES.KUBECTL,
        environment: { HOME: "/tmp" },
        commands: (ci) => [
          "set -e",
          `CONTENT_HASH="${ci.inputsHash}"`,
          ...SKIP_CHECK,
          `kubectl apply --server-side --force-conflicts -f ${ci.workspace}/infra/k8s/src/cert-manager/generated/cluster-issuer.generated.yaml`,
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["cert-manager-apply-cloudflare-token"],
    },
    {
      ...step({
        name: "cert-manager-stamp-content-hash",
        image: IMAGES.KUBECTL,
        environment: { HOME: "/tmp" },
        commands: (ci) => [
          "set -e",
          "kubectl create configmap cert-manager-pipeline-state -n cert-manager --dry-run=client -o yaml | kubectl apply -f -",
          `kubectl annotate configmap cert-manager-pipeline-state -n cert-manager pipeline.alanwalton.com/content-hash=${ci.inputsHash} --overwrite`,
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["cert-manager-apply-cluster-issuer"],
    },
  ],
})
