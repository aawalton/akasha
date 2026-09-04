import { kubectlApply } from "@akasha/workflow-language/kubectl-apply"
import { applyRbac } from "@akasha/workflow-language/rbac-apply"
import { sopsDecryptApply } from "@akasha/workflow-language/sops-decrypt"
import { workflow } from "@akasha/workflow-language/workflow"

export const workflows = [
  workflow("archive-of-worlds", {
    kind: "foundation",
    dependsOn: ["ci-images", "preparation", "app-namespaces"],
    when: { branch: "main", event: "push" },
    steps: [
      applyRbac({
        name: "archive-of-worlds-apply-rbac",
        rbacFile:
          "infrastructure/cluster-manifests/archive-of-worlds-web-rbac/archive-of-worlds-web-rbac.module.code.ts",
      }),
      kubectlApply({
        name: "archive-of-worlds-infra-apply-service",
        namespace: "archive-of-worlds",
        files:
          "archive-of-worlds/archive-of-worlds-web/generated/web-service.generated.yaml",
        serverSide: true,
      }),
      sopsDecryptApply({
        name: "archive-of-worlds-infra-apply-secrets",
        namespace: "archive-of-worlds",
        secretFile: "archive-of-worlds/archive-of-worlds-web/deploy/secrets.sops.yaml",
      }),
    ],
  }),
]
