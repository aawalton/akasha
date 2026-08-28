import { kubectlApply } from "../../tools/lib/workflow-dsl/templates/kubectl-apply"
import { applyRbac } from "../../tools/lib/workflow-dsl/templates/rbac-apply"
import { sopsDecryptApply } from "../../tools/lib/workflow-dsl/templates/sops-decrypt"
import { workflow } from "../../tools/lib/workflow-dsl/workflow"

export const workflows = [
  workflow("smilingjenny", {
    kind: "foundation",
    dependsOn: ["ci-images", "preparation"],
    when: { branch: "main", event: "push" },
    steps: [
      applyRbac({ name: "smilingjenny-apply-rbac", rbacFile: "tools/lib/rbac/smilingjenny-web.ts" }),
      kubectlApply({
        name: "smilingjenny-infra-apply-service",
        namespace: "smilingjenny",
        files: "smilingjenny/web/deploy/k8s/generated/web-service.generated.yaml",
        serverSide: true,
      }),
      sopsDecryptApply({
        name: "smilingjenny-infra-apply-secrets",
        namespace: "smilingjenny",
        secretFile: "smilingjenny/web/deploy/secrets.sops.yaml",
      }),
    ],
  }),
]
