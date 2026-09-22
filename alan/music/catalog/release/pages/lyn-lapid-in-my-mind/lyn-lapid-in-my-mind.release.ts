import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lynLapidInMyMind = {
  id: "01a0676a-d721-7069-a790-f82ec8ccdf0b",
  type: "page-type/release",
  slug: "lyn-lapid-in-my-mind",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lyn-lapid"],
  position: 0,
  publishedAt: "2021-10-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7AvjK1iLaukb9xYs9aHdG2",
      externalLink: "https://open.spotify.com/album/7AvjK1iLaukb9xYs9aHdG2",
    },
  ],
  title: "In My Mind",
} as const satisfies Release
