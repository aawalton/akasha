import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonMidnightSun2 = {
  id: "01a0676a-d724-7062-825e-08d1722f3cd1",
  type: "page-type/release",
  slug: "zara-larsson-midnight-sun-2",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  publishedAt: "2025-11-14",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4JXdBmsjMFifrVQK8pu2rw",
      externalLink: "https://open.spotify.com/album/4JXdBmsjMFifrVQK8pu2rw",
      lastSyncedAt: "2025-12-20",
    },
  ],
  title: "Midnight Sun",
} as const satisfies Release
