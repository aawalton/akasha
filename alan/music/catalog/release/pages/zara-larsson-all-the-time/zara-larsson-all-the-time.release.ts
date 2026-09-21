import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonAllTheTime = {
  id: "01a0676a-d716-7025-a08c-551abb96b705",
  type: "page-type/release",
  slug: "zara-larsson-all-the-time",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  publishedAt: "2019-06-21",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4x79GTZCS7XsmxK9qxxMmV",
      externalLink: "https://open.spotify.com/album/4x79GTZCS7XsmxK9qxxMmV",
      lastSyncedAt: "2025-12-20",
    },
  ],
  title: "All the Time",
} as const satisfies Release
