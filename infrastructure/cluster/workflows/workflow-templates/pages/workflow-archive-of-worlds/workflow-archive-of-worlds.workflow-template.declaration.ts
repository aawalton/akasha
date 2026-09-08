import { kubectlApply } from "@akasha/workflow-language/kubectl-apply"
import { applyRbac } from "@akasha/workflow-language/rbac-apply"
import { secretPlaceApply } from "@akasha/workflow-language/secret-place"
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
          "infrastructure/cluster/manifests/archive-of-worlds-web-rbac/archive-of-worlds-web-rbac.module.code.ts",
      }),
      kubectlApply({
        name: "archive-of-worlds-infra-apply-service",
        namespace: "archive-of-worlds",
        files: "archive-of-worlds/archive-of-worlds-web/generated/web-service.generated.yaml",
        serverSide: true,
      }),
      secretPlaceApply({
        name: "archive-of-worlds-infra-apply-secrets",
        namespace: "archive-of-worlds",
        resource: "archive-of-worlds-secrets",
      }),
    ],
  }),
]
