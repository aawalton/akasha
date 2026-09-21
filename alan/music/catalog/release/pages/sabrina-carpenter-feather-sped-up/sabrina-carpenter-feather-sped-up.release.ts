import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const sabrinaCarpenterFeatherSpedUp = {
  id: "01a0676a-d71d-706d-a97a-fe3bfff6b0e2",
  type: "page-type/release",
  slug: "sabrina-carpenter-feather-sped-up",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/sabrina-carpenter"],
  position: 0,
  publishedAt: "2023-08-04",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0TCgFAC92fkbHe2lJkwZRF",
      externalLink: "https://open.spotify.com/album/0TCgFAC92fkbHe2lJkwZRF",
      lastSyncedAt: "2025-12-24",
    },
  ],
  title: "Feather (Sped Up)",
} as const satisfies Release
