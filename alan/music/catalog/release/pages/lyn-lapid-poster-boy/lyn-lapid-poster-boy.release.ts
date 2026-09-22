import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lynLapidPosterBoy = {
  id: "01a0676a-d727-700e-9c23-4d2ca0927073",
  type: "page-type/release",
  slug: "lyn-lapid-poster-boy",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lyn-lapid"],
  position: 0,
  publishedAt: "2023-04-14",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2ErL96QPbe4hXnU8K2giJr",
      externalLink: "https://open.spotify.com/album/2ErL96QPbe4hXnU8K2giJr",
    },
  ],
  title: "poster boy",
} as const satisfies Release
