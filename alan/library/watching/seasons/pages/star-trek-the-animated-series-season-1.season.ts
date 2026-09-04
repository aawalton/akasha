import type { Season } from "../season.page-type.ts"

export const starTrekTheAnimatedSeriesSeason1 = {
  id: "01a06802-b8bd-7018-91b1-7d1932ef26a4",
  pageTypeSlug: "season",
  slug: "star-trek-the-animated-series-season-1",
  title: "Star Trek: The Animated Series Season 1",
  partOfSlugs: ["star-trek-the-animated-series"],
  position: 1,
  ownLength: 384,
  ownProgress: 384,
  unitSlug: "minutes",
  status: "completed",
  rank: "C",
  publishedAt: "1973-09-08",
  externalLink: "https://trakt.tv/shows/star-trek-the-animated-series/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
