import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lynLapidDeathWish = {
  id: "01a0676a-d71b-7074-b2af-cf4b5af5c979",
  type: "page-type/release",
  slug: "lyn-lapid-death-wish",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lyn-lapid"],
  position: 0,
  publishedAt: "2025-03-28",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2sGHtKgkeGmn5d8gpznBoH",
      externalLink: "https://open.spotify.com/album/2sGHtKgkeGmn5d8gpznBoH",
    },
  ],
  title: "death wish",
} as const satisfies Release
