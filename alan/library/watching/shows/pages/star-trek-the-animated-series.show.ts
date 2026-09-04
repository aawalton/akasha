import type { Show } from "../show.page-type.ts"

export const starTrekTheAnimatedSeries = {
  id: "01a06802-9332-702f-9cb5-29fad1a92fae",
  pageTypeSlug: "show",
  slug: "star-trek-the-animated-series",
  title: "Star Trek: The Animated Series",
  partOfSlugs: ["star-trek-3"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  rank: "C",
  publishedAt: "1973-09-08",
  externalLink: "https://trakt.tv/shows/star-trek-the-animated-series",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
