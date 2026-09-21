import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonPosterGirl = {
  id: "01a0676a-d727-700f-a72c-7ec36344b500",
  type: "page-type/release",
  slug: "zara-larsson-poster-girl",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  publishedAt: "2021-03-05",
  grade: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "79y7DSLFQH3907u4ysOMGr",
      externalLink: "https://open.spotify.com/album/79y7DSLFQH3907u4ysOMGr",
      lastSyncedAt: "2025-12-20",
    },
  ],
  title: "Poster Girl",
} as const satisfies Release
