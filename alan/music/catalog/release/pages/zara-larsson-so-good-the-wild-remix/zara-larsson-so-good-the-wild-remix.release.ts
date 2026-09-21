import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonSoGoodTheWildRemix = {
  id: "01a0676a-d729-7045-be20-85d0a16476cf",
  type: "page-type/release",
  slug: "zara-larsson-so-good-the-wild-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  publishedAt: "2017-03-10",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0xAsnsZQ02Pp8YVIRAGjPn",
      externalLink: "https://open.spotify.com/album/0xAsnsZQ02Pp8YVIRAGjPn",
      lastSyncedAt: "2025-12-20",
    },
  ],
  title: "So Good (The Wild Remix)",
} as const satisfies Release
