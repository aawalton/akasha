import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lynLapidEastSide = {
  id: "01a0676a-d71c-704b-a7b4-5f31413fa0b3",
  type: "page-type/release",
  slug: "lyn-lapid-east-side",
  title: "east side",
  partOfCollections: ["artist/lyn-lapid"],
  position: 0,
  ownLength: 2.759633,
  ownProgress: 2.759633,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "2023-11-17",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0TqA7jHzMVftg6xeMa9ZZj",
      externalLink: "https://open.spotify.com/album/0TqA7jHzMVftg6xeMa9ZZj",
    },
  ],
} as const satisfies Release
