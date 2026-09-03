import { kubectlApply } from "@akasha/workflow-language/kubectl-apply"
import { applyRbac } from "@akasha/workflow-language/rbac-apply"
import { sopsDecryptApply } from "@akasha/workflow-language/sops-decrypt"
import { workflow } from "@akasha/workflow-language/workflow"

export const workflows = [
  workflow("temper", {
    kind: "foundation",
    dependsOn: ["ci-images", "preparation"],
    when: { branch: "main", event: "push" },
    steps: [
      applyRbac({
        name: "temper-apply-rbac",
        rbacFile:
          "akasha/infrastructure/cluster-manifests/temper-web-rbac/temper-web-rbac.module.code.ts",
      }),
      kubectlApply({
        name: "temper-infra-apply-service",
        namespace: "temper",
        files: "akasha/temper/temper-web/generated/web-service.generated.yaml",
        serverSide: true,
      }),
      sopsDecryptApply({
        name: "temper-infra-apply-secrets",
        namespace: "temper",
        secretFile: "akasha/temper/temper-web/deploy/secrets.sops.yaml",
      }),
    ],
  }),
]
