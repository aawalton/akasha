import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lynLapidWhenSheLovedMe = {
  id: "01a0676a-d730-7058-9441-f78a1666f390",
  type: "page-type/release",
  slug: "lyn-lapid-when-she-loved-me",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lyn-lapid"],
  position: 0,
  publishedAt: "2021-05-25",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3nGZB91emd3OVE25ra3Ovp",
      externalLink: "https://open.spotify.com/album/3nGZB91emd3OVE25ra3Ovp",
    },
  ],
  title: "When She Loved Me",
} as const satisfies Release
