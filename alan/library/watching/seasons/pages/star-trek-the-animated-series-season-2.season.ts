import type { Season } from "../season.page-type.ts"

export const starTrekTheAnimatedSeriesSeason2 = {
  id: "01a06802-b8bd-7019-9b71-e3a7ffaacf4f",
  pageTypeSlug: "season",
  slug: "star-trek-the-animated-series-season-2",
  title: "Star Trek: The Animated Series Season 2",
  partOfSlugs: ["star-trek-the-animated-series"],
  position: 2,
  ownLength: 144,
  ownProgress: 144,
  unitSlug: "minutes",
  status: "completed",
  rank: "C",
  publishedAt: "1974-09-07",
  externalLink: "https://trakt.tv/shows/star-trek-the-animated-series/seasons/2",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
