import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lynLapidXmas01 = {
  id: "01a0676a-d731-7041-b6f1-11d22a6b9753",
  type: "page-type/release",
  slug: "lyn-lapid-xmas-01",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lyn-lapid"],
  position: 0,
  publishedAt: "2021-11-12",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3StuIrKZYryr4ZICoWRqqc",
      externalLink: "https://open.spotify.com/album/3StuIrKZYryr4ZICoWRqqc",
    },
  ],
  title: "XMAS 01",
} as const satisfies Release
