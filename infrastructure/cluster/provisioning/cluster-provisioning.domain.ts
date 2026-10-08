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
  createdAt: "2026-09-03T13:00:18.009Z",
  updatedAt: "2026-09-25T16:26:59.000Z",
} as const satisfies Domain
