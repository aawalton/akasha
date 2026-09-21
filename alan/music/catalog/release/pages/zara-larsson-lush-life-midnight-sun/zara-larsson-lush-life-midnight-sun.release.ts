import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonLushLifeMidnightSun = {
  id: "01a0676a-d724-701b-887c-d96b94fe14c3",
  type: "page-type/release",
  slug: "zara-larsson-lush-life-midnight-sun",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  publishedAt: "2026-01-06",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4zu8O4GN6bqOWHf1rBMULl",
      externalLink: "https://open.spotify.com/album/4zu8O4GN6bqOWHf1rBMULl",
      lastSyncedAt: "2026-01-20",
    },
  ],
  title: "Lush Life + Midnight Sun",
} as const satisfies Release
