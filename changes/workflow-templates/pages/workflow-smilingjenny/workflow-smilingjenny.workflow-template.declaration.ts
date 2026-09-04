import { kubectlApply } from "@akasha/workflow-language/kubectl-apply"
import { applyRbac } from "@akasha/workflow-language/rbac-apply"
import { sopsDecryptApply } from "@akasha/workflow-language/sops-decrypt"
import { workflow } from "@akasha/workflow-language/workflow"

export const workflows = [
  workflow("smilingjenny", {
    kind: "foundation",
    dependsOn: ["ci-images", "preparation"],
    when: { branch: "main", event: "push" },
    steps: [
      applyRbac({
        name: "smilingjenny-apply-rbac",
        rbacFile:
          "akasha/infrastructure/cluster-manifests/smilingjenny-web-rbac/smilingjenny-web-rbac.module.code.ts",
      }),
      kubectlApply({
        name: "smilingjenny-infra-apply-service",
        namespace: "smilingjenny",
        files: "akasha/smilingjenny/smilingjenny-web/generated/web-service.generated.yaml",
        serverSide: true,
      }),
      sopsDecryptApply({
        name: "smilingjenny-infra-apply-secrets",
        namespace: "smilingjenny",
        secretFile: "akasha/smilingjenny/smilingjenny-web/deploy/secrets.sops.yaml",
      }),
    ],
  }),
]
