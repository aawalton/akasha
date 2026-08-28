import { kubectlApply } from "../../tools/lib/workflow-dsl/templates/kubectl-apply"
import { applyRbac } from "../../tools/lib/workflow-dsl/templates/rbac-apply"
import { sopsDecryptApply } from "../../tools/lib/workflow-dsl/templates/sops-decrypt"
import { workflow } from "../../tools/lib/workflow-dsl/workflow"

export const workflows = [
  workflow("temper", {
    kind: "foundation",
    dependsOn: ["ci-images", "preparation"],
    when: { branch: "main", event: "push" },
    steps: [
      applyRbac({ name: "temper-apply-rbac", rbacFile: "tools/lib/rbac/temper-web.ts" }),
      kubectlApply({
        name: "temper-infra-apply-service",
        namespace: "temper",
        files: "temper/web/deploy/k8s/generated/web-service.generated.yaml",
        serverSide: true,
      }),
      sopsDecryptApply({
        name: "temper-infra-apply-secrets",
        namespace: "temper",
        secretFile: "temper/web/deploy/secrets.sops.yaml",
      }),
    ],
  }),
]
