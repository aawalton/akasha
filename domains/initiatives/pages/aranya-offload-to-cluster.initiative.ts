import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const aranyaOffloadToCluster = {
  id: "01a0a0d3-06ac-76e2-94f9-341e7ce50da4",
  type: "initiative",
  slug: "aranya-offload-to-cluster",
  domain: "domain/infrastructure",
  persona: "aranya",
  intentStack: [{ statement: "Builds and deploys run on the cluster." }],
} as const satisfies Initiative
