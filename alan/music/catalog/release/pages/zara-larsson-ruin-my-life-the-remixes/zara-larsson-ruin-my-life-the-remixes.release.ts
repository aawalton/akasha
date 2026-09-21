import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonRuinMyLifeTheRemixes = {
  id: "01a0676a-d728-702a-b8df-0e141f426926",
  type: "page-type/release",
  slug: "zara-larsson-ruin-my-life-the-remixes",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  publishedAt: "2018-01-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3eGJGZSlGVLfbVRkQQeOYg",
      externalLink: "https://open.spotify.com/album/3eGJGZSlGVLfbVRkQQeOYg",
      lastSyncedAt: "2025-12-20",
    },
  ],
  title: "Ruin My Life (The Remixes)",
} as const satisfies Release
