import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const clusterApi = {
  id: "01a068d4-d2aa-79d4-b241-bf8c8672b7fd",
  type: "page-type/domain",
  slug: "cluster-api",
  definition: "how code calls the cluster",
  parts: ["module/cluster-fetch", "module/cluster-jobs", "module/cluster-workloads"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every call here goes to the API server directly rather than through a proxy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The credential is a service account token the environment has.",
    },
  ],
} as const satisfies Domain
