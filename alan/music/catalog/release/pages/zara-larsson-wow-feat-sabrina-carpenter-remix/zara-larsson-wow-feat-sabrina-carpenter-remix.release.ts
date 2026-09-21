import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonWowFeatSabrinaCarpenterRemix = {
  id: "01a0676a-d731-703a-b9b4-b9e1a21f7ac2",
  type: "page-type/release",
  slug: "zara-larsson-wow-feat-sabrina-carpenter-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  publishedAt: "2020-09-25",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1RE0ZZJkxSZXdkNac4lcJD",
      externalLink: "https://open.spotify.com/album/1RE0ZZJkxSZXdkNac4lcJD",
      lastSyncedAt: "2025-12-20",
    },
  ],
  title: "WOW (feat. Sabrina Carpenter) [Remix]",
} as const satisfies Release
