import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonSoGood = {
  id: "01a0676a-d729-7043-a527-da914202e4c9",
  type: "page-type/release",
  slug: "zara-larsson-so-good",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  publishedAt: "2017-03-17",
  grade: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5YLRVHDVRw3QqWbeTGpC5B",
      externalLink: "https://open.spotify.com/album/5YLRVHDVRw3QqWbeTGpC5B",
      lastSyncedAt: "2025-12-20",
    },
  ],
  title: "So Good",
  createdAt: "2026-09-03T13:17:30.281Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Release
