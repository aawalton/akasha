import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiSugarStars = {
  id: "01a0676a-d72a-703e-8699-b32f339e1d9d",
  type: "page-type/release",
  slug: "vinny-marchi-sugar-stars",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2021-09-02",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0RhO7OMFRspLMPKlkfBLzI",
      externalLink: "https://open.spotify.com/album/0RhO7OMFRspLMPKlkfBLzI",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "sugar & stars",
} as const satisfies Release
