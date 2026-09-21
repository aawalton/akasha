import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const sabrinaCarpenterILlBeHomeForChristmas = {
  id: "01a0676a-d721-7029-b61e-08bf3dea1442",
  type: "page-type/release",
  slug: "sabrina-carpenter-i-ll-be-home-for-christmas",
  ownLength: 3.585533,
  ownProgress: 0,
  partOfCollections: ["artist/sabrina-carpenter"],
  position: 0,
  publishedAt: "2012-12-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0Ixya7yaDdNFbLpOCyEdvT",
      externalLink: "https://open.spotify.com/album/0Ixya7yaDdNFbLpOCyEdvT",
      lastSyncedAt: "2025-12-24",
    },
  ],
  title: "I'll Be Home For Christmas",
} as const satisfies Release
