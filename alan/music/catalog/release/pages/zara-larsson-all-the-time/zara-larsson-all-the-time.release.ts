import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonAllTheTime = {
  id: "01a0676a-d716-7025-a08c-551abb96b705",
  type: "release",
  slug: "zara-larsson-all-the-time",
  title: "All the Time",
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  ownLength: 3.801867,
  ownProgress: 3.801867,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2019-06-21",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4x79GTZCS7XsmxK9qxxMmV",
      externalLink: "https://open.spotify.com/album/4x79GTZCS7XsmxK9qxxMmV",
      lastSyncedAt: "2025-12-20",
    },
  ],
} as const satisfies Release
