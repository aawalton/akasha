import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonMidnightSun3 = {
  id: "01a0676a-d724-7063-84c4-7a90697ea2b7",
  type: "page-type/release",
  slug: "zara-larsson-midnight-sun-3",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  publishedAt: "2025-09-26",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0nte5x6fXd37Nt7jALSmx0",
      externalLink: "https://open.spotify.com/album/0nte5x6fXd37Nt7jALSmx0",
      lastSyncedAt: "2025-12-20",
    },
  ],
  title: "Midnight Sun",
} as const satisfies Release
