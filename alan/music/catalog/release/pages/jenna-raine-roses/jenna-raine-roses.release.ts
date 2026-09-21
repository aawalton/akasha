import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jennaRaineRoses = {
  id: "01a0676a-d728-7021-8719-c10cd46ad9d1",
  type: "page-type/release",
  slug: "jenna-raine-roses",
  grade: "A",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jenna-raine"],
  position: 0,
  publishedAt: "2024-08-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7I1rq9232iROAhn1YTYKcc",
      externalLink: "https://open.spotify.com/album/7I1rq9232iROAhn1YTYKcc",
    },
  ],
  title: "Roses",
} as const satisfies Release
