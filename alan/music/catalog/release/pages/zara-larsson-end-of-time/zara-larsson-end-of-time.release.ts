import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonEndOfTime = {
  id: "01a0676a-d71d-700f-ba23-caf40fcda5ed",
  type: "page-type/release",
  slug: "zara-larsson-end-of-time",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  publishedAt: "2023-05-18",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0PotAZ7tfMyOwYIG3vgCZT",
      externalLink: "https://open.spotify.com/album/0PotAZ7tfMyOwYIG3vgCZT",
      lastSyncedAt: "2025-12-20",
    },
  ],
  title: "End Of Time",
  createdAt: "2026-09-03T13:17:30.269Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
