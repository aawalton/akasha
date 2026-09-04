import { kubectlApply } from "@akasha/workflow-language/kubectl-apply"
import { applyRbac } from "@akasha/workflow-language/rbac-apply"
import { sopsDecryptApply } from "@akasha/workflow-language/sops-decrypt"
import { workflow } from "@akasha/workflow-language/workflow"

export const workflows = [
  workflow("audhdalan", {
    kind: "foundation",
    dependsOn: ["ci-images", "preparation"],
    when: { branch: "main", event: "push" },
    steps: [
      applyRbac({
        name: "audhdalan-apply-rbac",
        rbacFile:
          "infrastructure/cluster-manifests/audhdalan-web-rbac/audhdalan-web-rbac.module.code.ts",
      }),
      kubectlApply({
        name: "audhdalan-infra-apply-service",
        namespace: "audhdalan",
        files: "audhdalan/audhdalan-web/generated/web-service.generated.yaml",
        serverSide: true,
      }),
      sopsDecryptApply({
        name: "audhdalan-infra-apply-secrets",
        namespace: "audhdalan",
        secretFile: "audhdalan/audhdalan-web/deploy/secrets.sops.yaml",
      }),
    ],
  }),
]
