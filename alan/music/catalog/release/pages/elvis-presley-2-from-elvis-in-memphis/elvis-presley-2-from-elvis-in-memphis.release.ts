import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const elvisPresley2FromElvisInMemphis = {
  id: "01a0676a-d71e-7038-8d89-38eba6a5c6c9",
  type: "page-type/release",
  slug: "elvis-presley-2-from-elvis-in-memphis",
  title: "From Elvis in Memphis",
  partOfCollections: ["artist/elvis-presley"],
  position: 0,
  ownLength: 49.949017,
  ownProgress: 49.949017,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1969-06-17",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3ekkFrfotMsEAKc5g71GHk",
      externalLink: "https://open.spotify.com/album/3ekkFrfotMsEAKc5g71GHk",
    },
  ],
  createdAt: "2026-09-03T13:17:30.270Z",
  updatedAt: "2026-09-15T16:35:10.000Z",
} as const satisfies Release
