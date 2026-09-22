import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lynLapidProducerMan = {
  id: "01a0676a-d727-7026-933e-aa53a850d836",
  type: "page-type/release",
  slug: "lyn-lapid-producer-man",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lyn-lapid"],
  position: 0,
  publishedAt: "2020-10-14",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4TEbnRfzMNFYy2H6U2oRt4",
      externalLink: "https://open.spotify.com/album/4TEbnRfzMNFYy2H6U2oRt4",
    },
  ],
  title: "Producer Man",
} as const satisfies Release
