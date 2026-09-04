import type { Season } from "../season.page-type.ts"

export const starTrekSeason2 = {
  id: "01a06802-b8bd-7010-9395-6d83479bd4e3",
  pageTypeSlug: "season",
  slug: "star-trek-season-2",
  title: "Star Trek Season 2",
  partOfSlugs: ["star-trek-2"],
  position: 2,
  ownLength: 1305,
  ownProgress: 1305,
  unitSlug: "minutes",
  status: "completed",
  rank: "B",
  publishedAt: "1967-09-16",
  externalLink: "https://trakt.tv/shows/star-trek/seasons/2",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
