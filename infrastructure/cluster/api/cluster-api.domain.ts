import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const clusterApi = {
  id: "01a068d4-d2aa-79d4-b241-bf8c8672b7fd",
  type: "page-type/domain",
  slug: "cluster-api",
  definition: "how a program reaches the cluster's API server and what it asks of it",
  parts: ["module/cluster-fetch", "module/cluster-jobs", "module/cluster-workloads"],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every call here goes to the API server directly rather than through a proxy.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The credential is a service account token the environment has.",
    },
  ],
} as const satisfies Domain
