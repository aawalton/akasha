import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const clusterProvisioning = {
  id: "01a0675b-16d9-7eab-a110-f106ca00dad1",
  type: "page-type/domain",
  slug: "cluster-provisioning",
  definition: "how a new cluster is made",
  parts: ["certificate-authority/cluster-ca", "domain/bootstrap-layer", "domain/talos"],
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "`pipeline-orchestrator` is not in the chain.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "`pipeline-orchestrator` ships as steps in the main pipeline's `preparation` workflow.",
    },
  ],
} as const satisfies Domain
