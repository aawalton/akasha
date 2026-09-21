import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const gracieAbramsMinor = {
  id: "01a0676a-d724-706d-80a0-6af788ddda11",
  type: "page-type/release",
  slug: "gracie-abrams-minor",
  title: "minor",
  partOfCollections: ["artist/gracie-abrams"],
  position: 0,
  ownLength: 20.215567,
  ownProgress: 20.215567,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "2020-07-14",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2UZw04wDxLVceADw2Gi1Qy",
      externalLink: "https://open.spotify.com/album/2UZw04wDxLVceADw2Gi1Qy",
    },
  ],
} as const satisfies Release
