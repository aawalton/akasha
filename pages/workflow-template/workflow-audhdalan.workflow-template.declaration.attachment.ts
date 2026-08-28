import { kubectlApply } from "../../tools/lib/workflow-dsl/templates/kubectl-apply"
import { applyRbac } from "../../tools/lib/workflow-dsl/templates/rbac-apply"
import { sopsDecryptApply } from "../../tools/lib/workflow-dsl/templates/sops-decrypt"
import { workflow } from "../../tools/lib/workflow-dsl/workflow"

export const workflows = [
  workflow("audhdalan", {
    kind: "foundation",
    dependsOn: ["ci-images", "preparation"],
    when: { branch: "main", event: "push" },
    steps: [
      applyRbac({ name: "audhdalan-apply-rbac", rbacFile: "tools/lib/rbac/audhdalan-web.ts" }),
      kubectlApply({
        name: "audhdalan-infra-apply-service",
        namespace: "audhdalan",
        files: "audhdalan/web/deploy/k8s/generated/web-service.generated.yaml",
        serverSide: true,
      }),
      sopsDecryptApply({
        name: "audhdalan-infra-apply-secrets",
        namespace: "audhdalan",
        secretFile: "audhdalan/web/deploy/secrets.sops.yaml",
      }),
    ],
  }),
]
