import { kubectlApply } from "../../tools/lib/workflow-dsl/templates/kubectl-apply"
import { applyRbac } from "../../tools/lib/workflow-dsl/templates/rbac-apply"
import { sopsDecryptApply } from "../../tools/lib/workflow-dsl/templates/sops-decrypt"
import { workflow } from "../../tools/lib/workflow-dsl/workflow"

export default workflow("tailnet-egress", {
  kind: "foundation",
  dependsOn: ["preparation"],
  when: { branch: "main", event: "push" },
  steps: [
    kubectlApply({
      name: "tailnet-egress-apply-namespace",
      namespace: "tailnet-egress",
      files: "infra/k8s/src/tailnet-egress/generated/namespace.generated.yaml",
      serverSide: true,
    }),
    applyRbac({
      name: "tailnet-egress-apply-rbac",
      rbacFile: "tools/lib/rbac/tailnet-egress.ts",
    }),
    sopsDecryptApply({
      name: "tailnet-egress-apply-secret",
      namespace: "tailnet-egress",
      secretFile: "infra/k8s/src/tailnet-egress/tailnet-egress-auth.k8s-secret.sops.yaml",
    }),
    kubectlApply({
      name: "tailnet-egress-apply-network-policy",
      namespace: "tailnet-egress",
      files: "infra/k8s/src/tailnet-egress/generated/network-policy.generated.yaml",
      serverSide: true,
    }),
    {
      ...kubectlApply({
        name: "tailnet-egress-apply-deployment",
        namespace: "tailnet-egress",
        files: "infra/k8s/src/tailnet-egress/generated/deployment.generated.yaml",
        serverSide: true,
      }),
      dependsOn: [
        "tailnet-egress-apply-namespace",
        "tailnet-egress-apply-rbac",
        "tailnet-egress-apply-secret",
        "tailnet-egress-apply-network-policy",
      ],
    },
    {
      ...kubectlApply({
        name: "tailnet-egress-apply-service",
        namespace: "tailnet-egress",
        files: "infra/k8s/src/tailnet-egress/generated/service.generated.yaml",
        serverSide: true,
      }),
      dependsOn: ["tailnet-egress-apply-namespace"],
    },
  ],
})
