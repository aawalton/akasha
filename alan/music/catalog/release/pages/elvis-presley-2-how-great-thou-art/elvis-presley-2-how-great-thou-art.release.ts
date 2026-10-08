import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const elvisPresley2HowGreatThouArt = {
  id: "01a0676a-d720-706f-8ffa-02a4b6a03082",
  type: "page-type/release",
  slug: "elvis-presley-2-how-great-thou-art",
  title: "How Great Thou Art",
  partOfCollections: ["artist/elvis-presley"],
  position: 0,
  ownLength: 39.500583,
  ownProgress: 39.500583,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1967-02-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7N1t7WzloZyMj95jk6CSCt",
      externalLink: "https://open.spotify.com/album/7N1t7WzloZyMj95jk6CSCt",
    },
  ],
  createdAt: "2026-09-03T13:17:30.272Z",
  updatedAt: "2026-09-15T16:35:10.000Z",
} as const satisfies Release
