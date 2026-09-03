import type { Season } from "../season.page-type.ts"

export const starTrekSeason1 = {
  id: "01a06802-b8bd-700f-957a-d4abbbf68313",
  pageTypeSlug: "season",
  slug: "star-trek-season-1",
  title: "Star Trek Season 1",
  partOfSlugs: ["star-trek-2"],
  position: 1,
  ownLength: 1453.8,
  ownProgress: 1453.8,
  unitSlug: "minutes",
  status: "completed",
  rank: "B",
  publishedAt: "1966-09-09",
  externalLink: "https://trakt.tv/shows/star-trek/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
