import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayChampionOfTheWorldLiveAtNprSTinyDesk = {
  id: "01a0676a-d71a-7010-a145-725f2b920476",
  type: "page-type/release",
  slug: "coldplay-champion-of-the-world-live-at-npr-s-tiny-desk",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2020-03-16",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1YFEfpOP0NJFr4my1WZJgA",
      externalLink: "https://open.spotify.com/album/1YFEfpOP0NJFr4my1WZJgA",
    },
  ],
  title: "Champion Of The World (Live at NPR's Tiny Desk)",
} as const satisfies Release
