import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lynLapidSaturn = {
  id: "01a0676a-d728-7042-811b-7b5fc40166d6",
  type: "release",
  slug: "lyn-lapid-saturn",
  title: "Saturn",
  partOfCollections: ["artist/lyn-lapid"],
  position: 0,
  ownLength: 3.5611,
  ownProgress: 3.5611,
  unit: "unit/minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2022-12-02",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3zt7xkuRvDftoB76HEu3oH",
      externalLink: "https://open.spotify.com/album/3zt7xkuRvDftoB76HEu3oH",
    },
  ],
} as const satisfies Release
