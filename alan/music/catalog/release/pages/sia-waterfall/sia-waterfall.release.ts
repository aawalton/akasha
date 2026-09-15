import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const siaWaterfall = {
  id: "01a0676a-d730-701e-b807-a0018a47ea49",
  type: "page-type/release",
  slug: "sia-waterfall",
  title: "Waterfall",
  partOfCollections: ["artist/sia"],
  position: 0,
  ownLength: 3.333817,
  ownProgress: 3.333817,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2017-03-10",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4j8Wr17zfsvxEpeTXHbrmL",
      externalLink: "https://open.spotify.com/album/4j8Wr17zfsvxEpeTXHbrmL",
      lastSyncedAt: "2025-11-27",
    },
  ],
} as const satisfies Release
