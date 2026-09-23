import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2TodayWasAFairytale = {
  id: "01a0676a-d72f-700b-9a64-086da5664c5f",
  type: "page-type/release",
  slug: "taylor-swift-2-today-was-a-fairytale",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2010-01-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2JK0T590oG0pJckY9HRniL",
      externalLink: "https://open.spotify.com/album/2JK0T590oG0pJckY9HRniL",
    },
  ],
  title: "Today Was A Fairytale",
} as const satisfies Release
