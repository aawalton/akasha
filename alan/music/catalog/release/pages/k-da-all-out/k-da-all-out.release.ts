import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const kDaAllOut = {
  id: "01a0676a-d716-7024-9785-d113f7278972",
  type: "release",
  slug: "k-da-all-out",
  title: "ALL OUT",
  partOfCollections: ["artist/k-da"],
  position: 0,
  ownLength: 16.305633,
  ownProgress: 16.305633,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2020-11-06",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3wX4yrxMuHapSLvadxQkVV",
      externalLink: "https://open.spotify.com/album/3wX4yrxMuHapSLvadxQkVV",
    },
  ],
} as const satisfies Release
