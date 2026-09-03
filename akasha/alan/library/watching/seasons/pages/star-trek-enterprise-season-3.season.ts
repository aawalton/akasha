import type { Season } from "../season.page-type.ts"

export const starTrekEnterpriseSeason3 = {
  id: "01a06802-b8bd-7000-be90-45719b847393",
  pageTypeSlug: "season",
  slug: "star-trek-enterprise-season-3",
  title: "Star Trek: Enterprise Season 3",
  partOfSlugs: ["star-trek-enterprise"],
  position: 3,
  ownLength: 1032,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2003-09-11",
  externalLink: "https://trakt.tv/shows/star-trek-enterprise/seasons/3",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
