import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeAHandForMrsClaus = {
  id: "01a0676a-d715-7027-b8d6-a7c375c38b59",
  type: "page-type/release",
  slug: "ariana-grande-a-hand-for-mrs-claus",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2019-10-18",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "62OlfZyTDTwngT4QlTxiAo",
      externalLink: "https://open.spotify.com/album/62OlfZyTDTwngT4QlTxiAo",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "A Hand For Mrs. Claus",
} as const satisfies Release
