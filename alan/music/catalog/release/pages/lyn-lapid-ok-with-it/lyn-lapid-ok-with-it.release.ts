import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lynLapidOkWithIt = {
  id: "01a0676a-d726-701d-9397-c2e75161851f",
  type: "page-type/release",
  slug: "lyn-lapid-ok-with-it",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lyn-lapid"],
  position: 0,
  publishedAt: "2023-05-19",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1VTt9SI2yCJMHuJ9JItnt9",
      externalLink: "https://open.spotify.com/album/1VTt9SI2yCJMHuJ9JItnt9",
    },
  ],
  title: "ok with it",
} as const satisfies Release
