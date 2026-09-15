import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const justinTimberlakeBetterDays = {
  id: "01a0676a-d718-704c-b452-40a9f824e6d9",
  type: "release",
  slug: "justin-timberlake-better-days",
  title: "Better Days",
  partOfCollections: ["artist/justin-timberlake"],
  position: 0,
  ownLength: 3.31,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2020-12-03",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1E2xZvT2ZJAjZGSIrkRpJW",
      externalLink: "https://open.spotify.com/album/1E2xZvT2ZJAjZGSIrkRpJW",
    },
  ],
} as const satisfies Release
