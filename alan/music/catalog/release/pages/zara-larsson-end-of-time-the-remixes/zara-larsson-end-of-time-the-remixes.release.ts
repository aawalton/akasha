import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonEndOfTimeTheRemixes = {
  id: "01a0676a-d71d-7013-8cbd-cba508be0072",
  type: "page-type/release",
  slug: "zara-larsson-end-of-time-the-remixes",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  publishedAt: "2023-07-15",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0FDfOSxSBYNksoMRkng7Ao",
      externalLink: "https://open.spotify.com/album/0FDfOSxSBYNksoMRkng7Ao",
      lastSyncedAt: "2025-12-20",
    },
  ],
  title: "End of Time (The Remixes)",
} as const satisfies Release
