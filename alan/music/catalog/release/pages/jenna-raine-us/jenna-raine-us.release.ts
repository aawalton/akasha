import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jennaRaineUs = {
  id: "01a0676a-d72f-7059-891c-06623cd448ae",
  type: "page-type/release",
  slug: "jenna-raine-us",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jenna-raine"],
  position: 0,
  publishedAt: "2018-10-26",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1DWa4AfwVt5paG5c9oXkGO",
      externalLink: "https://open.spotify.com/album/1DWa4AfwVt5paG5c9oXkGO",
    },
  ],
  title: "us",
  createdAt: "2026-09-03T13:17:30.287Z",
  updatedAt: "2026-09-21T23:00:38.000Z",
} as const satisfies Release
