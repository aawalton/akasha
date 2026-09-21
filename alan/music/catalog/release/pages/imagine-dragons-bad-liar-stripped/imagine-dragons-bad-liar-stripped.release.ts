import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const imagineDragonsBadLiarStripped = {
  id: "01a0676a-d718-700c-8e14-819deed046a0",
  type: "page-type/release",
  slug: "imagine-dragons-bad-liar-stripped",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/imagine-dragons"],
  position: 0,
  publishedAt: "2019-05-31",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "58401eNNELkIVx3xiwzJFy",
      externalLink: "https://open.spotify.com/album/58401eNNELkIVx3xiwzJFy",
    },
  ],
  title: "Bad Liar – Stripped",
} as const satisfies Release
