import { kubectlApply } from "../../tools/lib/workflow-dsl/templates/kubectl-apply.ts"
import { applyRbac } from "../../tools/lib/workflow-dsl/templates/rbac-apply.ts"
import { workflow } from "../../tools/lib/workflow-dsl/workflow.ts"

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
