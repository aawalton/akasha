import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jennaRaineRoses = {
  id: "01a0676a-d728-7021-8719-c10cd46ad9d1",
  type: "release",
  slug: "jenna-raine-roses",
  title: "Roses",
  partOfCollections: ["artist/jenna-raine"],
  position: 0,
  ownLength: 3.175567,
  ownProgress: 3.175567,
  unit: "unit/minutes",
  status: "completed",
  rank: "A",
  publishedAt: "2024-08-09",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7I1rq9232iROAhn1YTYKcc",
      externalLink: "https://open.spotify.com/album/7I1rq9232iROAhn1YTYKcc",
    },
  ],
} as const satisfies Release
