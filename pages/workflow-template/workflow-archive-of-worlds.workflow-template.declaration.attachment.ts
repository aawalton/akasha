import { kubectlApply } from "../../tools/lib/workflow-dsl/templates/kubectl-apply"
import { applyRbac } from "../../tools/lib/workflow-dsl/templates/rbac-apply"
import { sopsDecryptApply } from "../../tools/lib/workflow-dsl/templates/sops-decrypt"
import { workflow } from "../../tools/lib/workflow-dsl/workflow"

export const workflows = [
  workflow("archive-of-worlds", {
    kind: "foundation",
    dependsOn: ["ci-images", "preparation", "app-namespaces"],
    when: { branch: "main", event: "push" },
    steps: [
      applyRbac({
        name: "archive-of-worlds-apply-rbac",
        rbacFile: "tools/lib/rbac/archive-of-worlds-web.ts",
      }),
      kubectlApply({
        name: "archive-of-worlds-infra-apply-service",
        namespace: "archive-of-worlds",
        files: "archive-of-worlds/web/deploy/k8s/generated/web-service.generated.yaml",
        serverSide: true,
      }),
      sopsDecryptApply({
        name: "archive-of-worlds-infra-apply-secrets",
        namespace: "archive-of-worlds",
        secretFile: "archive-of-worlds/web/deploy/secrets.sops.yaml",
      }),
    ],
  }),
]
