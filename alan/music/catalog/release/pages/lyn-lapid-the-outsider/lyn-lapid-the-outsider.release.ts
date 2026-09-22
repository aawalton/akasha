import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lynLapidTheOutsider = {
  id: "01a0676a-d72d-7050-9092-308d60625828",
  type: "page-type/release",
  slug: "lyn-lapid-the-outsider",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lyn-lapid"],
  position: 0,
  publishedAt: "2022-03-11",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0ftVjdPzK7QBpUQiBuL798",
      externalLink: "https://open.spotify.com/album/0ftVjdPzK7QBpUQiBuL798",
    },
  ],
  title: "The Outsider",
} as const satisfies Release
