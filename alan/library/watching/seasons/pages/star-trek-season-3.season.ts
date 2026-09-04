import type { Season } from "../season.page-type.ts"

export const starTrekSeason3 = {
  id: "01a06802-b8bd-7011-93e7-3c467f1f7b17",
  pageTypeSlug: "season",
  slug: "star-trek-season-3",
  title: "Star Trek Season 3",
  partOfSlugs: ["star-trek-2"],
  position: 3,
  ownLength: 1222.8,
  ownProgress: 1222.8,
  unitSlug: "minutes",
  status: "completed",
  rank: "B",
  publishedAt: "1968-09-21",
  externalLink: "https://trakt.tv/shows/star-trek/seasons/3",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
