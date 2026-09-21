import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayHigherPower = {
  id: "01a0676a-d720-703b-a588-77d391a2913d",
  type: "page-type/release",
  slug: "coldplay-higher-power",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2021-05-07",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6wiPmk3powmcz3G7zr6krg",
      externalLink: "https://open.spotify.com/album/6wiPmk3powmcz3G7zr6krg",
    },
  ],
  title: "Higher Power",
} as const satisfies Release
