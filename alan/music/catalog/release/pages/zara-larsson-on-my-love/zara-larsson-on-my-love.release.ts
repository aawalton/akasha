import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonOnMyLove = {
  id: "01a0676a-d726-7020-833d-7fbca9f36d60",
  type: "page-type/release",
  slug: "zara-larsson-on-my-love",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  publishedAt: "2023-09-15",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1NoYjCb7ReBR4kfmjntHTi",
      externalLink: "https://open.spotify.com/album/1NoYjCb7ReBR4kfmjntHTi",
      lastSyncedAt: "2025-12-20",
    },
  ],
  title: "On My Love",
  createdAt: "2026-09-03T13:17:30.278Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
