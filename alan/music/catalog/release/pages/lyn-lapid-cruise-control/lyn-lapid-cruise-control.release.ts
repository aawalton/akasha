import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lynLapidCruiseControl = {
  id: "01a0676a-d71b-7040-bf8b-d3bddfcd17b2",
  type: "page-type/release",
  slug: "lyn-lapid-cruise-control",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lyn-lapid"],
  position: 0,
  publishedAt: "2024-03-29",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3oHO5lsSGBC4gEs4Et9Thn",
      externalLink: "https://open.spotify.com/album/3oHO5lsSGBC4gEs4Et9Thn",
    },
  ],
  title: "Cruise Control",
} as const satisfies Release
