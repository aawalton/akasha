import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const theWheelOfTimeOrigins = {
  id: "01a06802-9333-7008-ba07-5cbeb4405e43",
  type: "page-type/show",
  slug: "the-wheel-of-time-origins",
  title: "The Wheel of Time: Origins",
  partOfCollections: ["fandom/the-wheel-of-time-2"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2021-11-18",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/the-wheel-of-time-origins",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Show
