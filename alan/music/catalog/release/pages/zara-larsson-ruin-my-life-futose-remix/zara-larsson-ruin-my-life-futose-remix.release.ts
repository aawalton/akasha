import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonRuinMyLifeFutoseRemix = {
  id: "01a0676a-d728-7029-bed3-837e6125dc70",
  type: "page-type/release",
  slug: "zara-larsson-ruin-my-life-futose-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  publishedAt: "2018-11-19",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6KLMfTPekfQUaKhdaGVkch",
      externalLink: "https://open.spotify.com/album/6KLMfTPekfQUaKhdaGVkch",
      lastSyncedAt: "2025-12-20",
    },
  ],
  title: "Ruin My Life (Futosé Remix)",
} as const satisfies Release
