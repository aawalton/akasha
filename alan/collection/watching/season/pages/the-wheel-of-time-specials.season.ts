import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theWheelOfTimeSpecials = {
  id: "01a06802-b8bf-7050-90c5-059a721a605e",
  type: "page-type/season",
  slug: "the-wheel-of-time-specials",
  title: "The Wheel of Time Specials",
  partOfCollections: ["show/the-wheel-of-time"],
  position: 0,
  ownLength: 316.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2021-11-18",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-280433",
      externalLink: "https://trakt.tv/shows/the-wheel-of-time/seasons/0",
      lastSyncedAt: "2025-12-19",
    },
  ],
} as const satisfies Season
