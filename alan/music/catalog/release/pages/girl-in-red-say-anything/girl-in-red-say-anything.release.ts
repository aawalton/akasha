import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const girlInRedSayAnything = {
  id: "01a0676a-d728-704a-a900-6a87cadb53c3",
  type: "page-type/release",
  slug: "girl-in-red-say-anything",
  title: "say anything",
  partOfCollections: ["artist/girl-in-red"],
  position: 0,
  ownLength: 2.378333,
  ownProgress: 2.378333,
  unit: "unit/minutes",
  status: "completed",
  grade: "C",
  publishedAt: "2018-03-03",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6uwwBscD3q3ZGNTezjvvEL",
      externalLink: "https://open.spotify.com/album/6uwwBscD3q3ZGNTezjvvEL",
    },
  ],
  createdAt: "2026-09-03T13:17:30.280Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Release
