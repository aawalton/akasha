import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const rockapellaRockAroundTheClockTellMeSomethingGood = {
  id: "01a0676a-d728-7017-b409-41d179e4bf21",
  type: "page-type/release",
  slug: "rockapella-rock-around-the-clock-tell-me-something-good",
  title: "Rock Around the Clock / Tell Me Something Good",
  partOfCollections: ["artist/rockapella"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2015-04-11",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1sLoy1MRJTRjsAdIF6duAW",
      externalLink: "https://open.spotify.com/album/1sLoy1MRJTRjsAdIF6duAW",
    },
  ],
} as const satisfies Release
