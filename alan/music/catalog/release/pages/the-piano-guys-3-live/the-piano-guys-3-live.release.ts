import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3Live = {
  id: "01a0676a-d723-703e-828b-c9533218b651",
  type: "page-type/release",
  slug: "the-piano-guys-3-live",
  title: "Live!",
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  ownLength: 55.288567,
  ownProgress: 55.288567,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2015-11-13",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6hoa5K74pqIBYkeaNUZKuL",
      externalLink: "https://open.spotify.com/album/6hoa5K74pqIBYkeaNUZKuL",
    },
  ],
} as const satisfies Release
