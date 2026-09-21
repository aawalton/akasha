import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeMyEverythingTenthAnniversaryEdition = {
  id: "01a0676a-d725-7027-839d-3447657af551",
  type: "page-type/release",
  slug: "ariana-grande-my-everything-tenth-anniversary-edition",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2024-08-22",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2uMTmPEFafKfKeobvdx5EE",
      externalLink: "https://open.spotify.com/album/2uMTmPEFafKfKeobvdx5EE",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "My Everything (Tenth Anniversary Edition)",
} as const satisfies Release
