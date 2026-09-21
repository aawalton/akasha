import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraStjernestV = {
  id: "01a0676a-d72a-7020-9221-3c0ef8fcf2b4",
  type: "page-type/release",
  slug: "aurora-stjernest-v",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2020-11-23",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "51g1ZXsMZYm2u63xiBJhc8",
      externalLink: "https://open.spotify.com/album/51g1ZXsMZYm2u63xiBJhc8",
    },
  ],
  title: "Stjernestøv",
} as const satisfies Release
