import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const sabrinaCarpenterVicious = {
  id: "01a0676a-d730-7003-8d7b-76333abc6c98",
  type: "page-type/release",
  slug: "sabrina-carpenter-vicious",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/sabrina-carpenter"],
  position: 0,
  publishedAt: "2022-07-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7p3M1cRTouWTpmBDhlEAKS",
      externalLink: "https://open.spotify.com/album/7p3M1cRTouWTpmBDhlEAKS",
      lastSyncedAt: "2025-12-24",
    },
  ],
  title: "Vicious",
} as const satisfies Release
