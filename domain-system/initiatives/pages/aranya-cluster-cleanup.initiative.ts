import type { Initiative } from "../initiative.page-type.ts"

export const aranyaClusterCleanup = {
  id: "01a06cf9-0d41-7a81-b1f0-f0e645bd59f2",
  pageTypeSlug: "initiative",
  slug: "aranya-cluster-cleanup",
  domainSlug: "domain/infrastructure",
  personaSlug: "aranya",
  intents: [
    { statement: "All cluster-specific files are in the cluster/ folder." },
    { statement: "The cluster/ folder passes the `folder-matches-a-shape` check." },
  ],
} as const satisfies Initiative
