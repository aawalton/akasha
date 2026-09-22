import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const kDaAllOut = {
  id: "01a0676a-d716-7024-9785-d113f7278972",
  type: "page-type/release",
  slug: "k-da-all-out",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/k-da"],
  position: 0,
  publishedAt: "2020-11-06",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3wX4yrxMuHapSLvadxQkVV",
      externalLink: "https://open.spotify.com/album/3wX4yrxMuHapSLvadxQkVV",
    },
  ],
  title: "ALL OUT",
} as const satisfies Release
