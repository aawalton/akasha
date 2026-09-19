import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const dallaOffloadToCluster = {
  id: "01a0a0d3-06ac-76e2-94f9-341e7ce50da4",
  type: "page-type/initiative",
  slug: "dalla-offload-to-cluster",
  domain: "domain/infrastructure",
  persona: "persona/dalla",
  intentStack: [
    {
      statement:
        "A namespace is named for one service and holds that service with the satellites of that service.",
    },
  ],
  constraints: [
    "A cluster service, a container recipe and a web app are put up by a run triggered on the workstation and made nowhere on it.",
    "The commit a run is made at reaches the cluster as a push to origin.",
    "A run checks that commit out in the cluster rather than being handed a tree from the workstation.",
    "What a run learns is written through the pages service rather than into the tree the run holds.",
    "A workstation service, an iOS app, an inference service and an ESO addon are put up on the workstation.",
  ],
} as const satisfies Initiative
