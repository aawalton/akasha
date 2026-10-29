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
    { source: "tmdb", externalId: "307623", externalLink: "https://www.themoviedb.org/tv/307623" },
  ],
  createdAt: "2026-09-03T16:03:14.355Z",
  updatedAt: "2026-10-29T15:48:04.589Z",
} as const satisfies Show
