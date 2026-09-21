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
} as const satisfies Release
