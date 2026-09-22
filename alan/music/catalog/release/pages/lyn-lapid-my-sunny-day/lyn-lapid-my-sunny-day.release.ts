import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lynLapidMySunnyDay = {
  id: "01a0676a-d725-7035-b586-c5d2fc42b647",
  type: "page-type/release",
  slug: "lyn-lapid-my-sunny-day",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lyn-lapid"],
  position: 0,
  publishedAt: "2021-12-10",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2VgKPs6EdAvOdySgcnMweQ",
      externalLink: "https://open.spotify.com/album/2VgKPs6EdAvOdySgcnMweQ",
    },
  ],
  title: "My Sunny Day",
} as const satisfies Release
