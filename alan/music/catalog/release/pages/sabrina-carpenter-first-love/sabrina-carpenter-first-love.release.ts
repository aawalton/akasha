import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const sabrinaCarpenterFirstLove = {
  id: "01a0676a-d71e-7002-8f50-251e0ee5fddb",
  type: "page-type/release",
  slug: "sabrina-carpenter-first-love",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/sabrina-carpenter"],
  position: 0,
  publishedAt: "2017-10-13",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7syMmofF2t1xI0RFCtrSG9",
      externalLink: "https://open.spotify.com/album/7syMmofF2t1xI0RFCtrSG9",
      lastSyncedAt: "2025-12-24",
    },
  ],
  title: "First Love",
} as const satisfies Release
