import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const starTrekTheAnimatedSeries = {
  id: "01a06802-9332-702f-9cb5-29fad1a92fae",
  type: "page-type/show",
  slug: "star-trek-the-animated-series",
  title: "Star Trek: The Animated Series",
  partOfCollections: ["fandom/star-trek-3"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  grade: "C",
  publishedAt: "1973-09-08",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek-the-animated-series",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Show
