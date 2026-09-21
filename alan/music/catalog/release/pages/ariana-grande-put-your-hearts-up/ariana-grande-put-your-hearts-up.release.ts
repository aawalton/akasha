import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandePutYourHeartsUp = {
  id: "01a0676a-d727-7035-9f95-1ecab0ee5875",
  type: "page-type/release",
  slug: "ariana-grande-put-your-hearts-up",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2011-01-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4tR7U06JWAgDcA1qfxtrD2",
      externalLink: "https://open.spotify.com/album/4tR7U06JWAgDcA1qfxtrD2",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "Put Your Hearts Up",
} as const satisfies Release
