import { kubectlApply } from "@akasha/workflow-language/kubectl-apply"
import { manifestPath } from "@akasha/workflow-language/manifest-path"
import { applyRbac } from "@akasha/workflow-language/rbac-apply"
import { workflow } from "@akasha/workflow-language/workflow"

const TAILNET_EGRESS_SYNTH =
  "service-system/cluster-services/pages/tailnet-egress/tailnet-egress.cluster-service.code.attachment.ts"

export default workflow("tailnet-egress", {
  kind: "foundation",
  dependsOn: ["preparation"],
  when: { branch: "main", event: "push" },
  steps: [
    kubectlApply({
      name: "tailnet-egress-apply-namespace",
      namespace: "tailnet-egress",
      files: manifestPath(TAILNET_EGRESS_SYNTH, "namespace"),
      serverSide: true,
    }),
    applyRbac({
      name: "tailnet-egress-apply-rbac",
      rbacFile:
        "infrastructure/cluster-manifests/tailnet-egress-rbac/tailnet-egress-rbac.module.code.ts",
    }),
    kubectlApply({
      name: "tailnet-egress-apply-network-policy",
      namespace: "tailnet-egress",
      files: manifestPath(TAILNET_EGRESS_SYNTH, "network-policy"),
      serverSide: true,
    }),
    {
      ...kubectlApply({
        name: "tailnet-egress-apply-deployment",
        namespace: "tailnet-egress",
        files: manifestPath(TAILNET_EGRESS_SYNTH, "deployment"),
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
        files: manifestPath(TAILNET_EGRESS_SYNTH, "service"),
        serverSide: true,
      }),
      dependsOn: ["tailnet-egress-apply-namespace"],
    },
  ],
})
