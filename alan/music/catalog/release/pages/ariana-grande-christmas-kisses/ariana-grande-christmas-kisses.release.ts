import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeChristmasKisses = {
  id: "01a0676a-d71a-703d-9594-46986cec33b1",
  type: "page-type/release",
  slug: "ariana-grande-christmas-kisses",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2013-01-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5MfeQZrrNfMqcaq03U9qOr",
      externalLink: "https://open.spotify.com/album/5MfeQZrrNfMqcaq03U9qOr",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "Christmas Kisses",
} as const satisfies Release
