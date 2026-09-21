import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonLayAllYourLoveOnMeSpotifySingles = {
  id: "01a0676a-d722-7065-9e0d-8f60bd1371bf",
  type: "page-type/release",
  slug: "zara-larsson-lay-all-your-love-on-me-spotify-singles",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  publishedAt: "2022-05-27",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4aCXO1evmETJ2Cy32sZ2Zj",
      externalLink: "https://open.spotify.com/album/4aCXO1evmETJ2Cy32sZ2Zj",
      lastSyncedAt: "2025-12-20",
    },
  ],
  title: "Lay All Your Love On Me - Spotify Singles",
} as const satisfies Release
