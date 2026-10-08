import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3Live = {
  id: "01a0676a-d723-703e-828b-c9533218b651",
  type: "page-type/release",
  slug: "the-piano-guys-3-live",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2015-11-13",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6hoa5K74pqIBYkeaNUZKuL",
      externalLink: "https://open.spotify.com/album/6hoa5K74pqIBYkeaNUZKuL",
    },
  ],
  title: "Live!",
  createdAt: "2026-09-03T13:17:30.275Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
