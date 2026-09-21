import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const theHoldernessFamilyBestOf2023 = {
  id: "01a0676a-d718-7045-bb92-057ad721ca0f",
  type: "page-type/release",
  slug: "the-holderness-family-best-of-2023",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/the-holderness-family"],
  position: 0,
  publishedAt: "2023-12-21",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5LZGuFGEseyRjpWKlhFQXs",
      externalLink: "https://open.spotify.com/album/5LZGuFGEseyRjpWKlhFQXs",
      lastSyncedAt: "2025-11-27",
    },
  ],
  title: "Best of 2023",
} as const satisfies Release
