import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theWheelOfTimeSeason1 = {
  id: "01a06802-b8bf-704d-89e4-0ee5c08df4bc",
  type: "page-type/season",
  slug: "the-wheel-of-time-season-1",
  title: "The Wheel of Time Season 1",
  partOfCollections: ["show/the-wheel-of-time"],
  position: 1,
  ownLength: 490.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2021-11-18",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-184269",
      externalLink: "https://trakt.tv/shows/the-wheel-of-time/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
