import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const aranyaOffloadToCluster = {
  id: "01a0a0d3-06ac-76e2-94f9-341e7ce50da4",
  type: "initiative",
  slug: "aranya-offload-to-cluster",
  domain: "domain/infrastructure",
  persona: "aranya",
  intentStack: [{ statement: "Builds and deploys run on the cluster." }],
  constraints: [
    "A build or a deploy is triggered on the workstation and runs nowhere on it.",
    "The commit a run is made at reaches the cluster as a push to origin.",
    "A run checks that commit out in the cluster rather than being handed a tree from the workstation.",
    "A run reads the index the checkout carries rather than deriving that index again.",
    "What a run learns is written through the pages service rather than into the tree the run holds.",
  ],
} as const satisfies Initiative
