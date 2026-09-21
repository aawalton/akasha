import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lynLapidCruiseControl = {
  id: "01a0676a-d71b-7040-bf8b-d3bddfcd17b2",
  type: "page-type/release",
  slug: "lyn-lapid-cruise-control",
  title: "Cruise Control",
  partOfCollections: ["artist/lyn-lapid"],
  position: 0,
  ownLength: 2.591433,
  ownProgress: 2.591433,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "2024-03-29",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3oHO5lsSGBC4gEs4Et9Thn",
      externalLink: "https://open.spotify.com/album/3oHO5lsSGBC4gEs4Et9Thn",
    },
  ],
} as const satisfies Release
