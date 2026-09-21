import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonEndOfTimeKungsRemix = {
  id: "01a0676a-d71d-7011-b334-40071606799e",
  type: "page-type/release",
  slug: "zara-larsson-end-of-time-kungs-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  publishedAt: "2023-07-14",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1BqkgscVh3nHItsJ8rC74C",
      externalLink: "https://open.spotify.com/album/1BqkgscVh3nHItsJ8rC74C",
      lastSyncedAt: "2025-12-20",
    },
  ],
  title: "End Of Time (Kungs Remix)",
} as const satisfies Release
