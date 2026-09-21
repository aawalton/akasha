import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayASkyFullOfStarsRobinSchulzRemix = {
  id: "01a0676a-d715-7042-95f1-cdfecf72f5ab",
  type: "page-type/release",
  slug: "coldplay-a-sky-full-of-stars-robin-schulz-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2014-07-31",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1QpCQWJU6BLupL1LgQoNXW",
      externalLink: "https://open.spotify.com/album/1QpCQWJU6BLupL1LgQoNXW",
    },
  ],
  title: "A Sky Full of Stars (Robin Schulz Remix)",
} as const satisfies Release
