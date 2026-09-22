import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lynLapidSaturn = {
  id: "01a0676a-d728-7042-811b-7b5fc40166d6",
  type: "page-type/release",
  slug: "lyn-lapid-saturn",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lyn-lapid"],
  position: 0,
  publishedAt: "2022-12-02",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3zt7xkuRvDftoB76HEu3oH",
      externalLink: "https://open.spotify.com/album/3zt7xkuRvDftoB76HEu3oH",
    },
  ],
  title: "Saturn",
} as const satisfies Release
