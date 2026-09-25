import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const theWheelOfTime = {
  id: "01a06802-9333-7007-b48a-6932fbb8c5f0",
  type: "page-type/show",
  slug: "the-wheel-of-time",
  title: "The Wheel of Time",
  partOfCollections: ["fandom/the-wheel-of-time-2"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2021-11-18",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/the-wheel-of-time",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Show
