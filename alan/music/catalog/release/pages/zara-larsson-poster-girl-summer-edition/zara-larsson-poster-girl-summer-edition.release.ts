import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonPosterGirlSummerEdition = {
  id: "01a0676a-d727-7010-b030-7452f85faab8",
  type: "page-type/release",
  slug: "zara-larsson-poster-girl-summer-edition",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  publishedAt: "2021-07-08",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0E6Bt7I9gHxC6j8UmaCXTh",
      externalLink: "https://open.spotify.com/album/0E6Bt7I9gHxC6j8UmaCXTh",
      lastSyncedAt: "2025-12-20",
    },
  ],
  title: "Poster Girl (Summer Edition)",
} as const satisfies Release
