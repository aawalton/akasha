import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lynLapidMySunnyDay = {
  id: "01a0676a-d725-7035-b586-c5d2fc42b647",
  type: "release",
  slug: "lyn-lapid-my-sunny-day",
  title: "My Sunny Day",
  partOfCollections: ["artist/lyn-lapid"],
  position: 0,
  ownLength: 2.160683,
  ownProgress: 2.160683,
  unit: "unit/minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2021-12-10",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2VgKPs6EdAvOdySgcnMweQ",
      externalLink: "https://open.spotify.com/album/2VgKPs6EdAvOdySgcnMweQ",
    },
  ],
} as const satisfies Release
