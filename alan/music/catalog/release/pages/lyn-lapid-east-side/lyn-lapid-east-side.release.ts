import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lynLapidEastSide = {
  id: "01a0676a-d71c-704b-a7b4-5f31413fa0b3",
  type: "page-type/release",
  slug: "lyn-lapid-east-side",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lyn-lapid"],
  position: 0,
  publishedAt: "2023-11-17",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0TqA7jHzMVftg6xeMa9ZZj",
      externalLink: "https://open.spotify.com/album/0TqA7jHzMVftg6xeMa9ZZj",
    },
  ],
  title: "east side",
  createdAt: "2026-09-03T13:17:30.268Z",
  updatedAt: "2026-09-22T14:00:43.000Z",
} as const satisfies Release
