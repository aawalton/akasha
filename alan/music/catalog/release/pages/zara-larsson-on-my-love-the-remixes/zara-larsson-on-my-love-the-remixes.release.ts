import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonOnMyLoveTheRemixes = {
  id: "01a0676a-d726-7022-930b-4f57d3a8e45a",
  type: "page-type/release",
  slug: "zara-larsson-on-my-love-the-remixes",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  publishedAt: "2023-12-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0iAv3656WbI551gLIRS6NB",
      externalLink: "https://open.spotify.com/album/0iAv3656WbI551gLIRS6NB",
      lastSyncedAt: "2025-12-20",
    },
  ],
  title: "On My Love (The Remixes)",
} as const satisfies Release
