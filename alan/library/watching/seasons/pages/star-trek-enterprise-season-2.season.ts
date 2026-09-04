import type { Season } from "../season.page-type.ts"

export const starTrekEnterpriseSeason2 = {
  id: "01a06802-b8bc-7054-ac8d-fc7c68a364ed",
  pageTypeSlug: "season",
  slug: "star-trek-enterprise-season-2",
  title: "Star Trek: Enterprise Season 2",
  partOfSlugs: ["star-trek-enterprise"],
  position: 2,
  ownLength: 1117.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2002-09-09",
  externalLink: "https://trakt.tv/shows/star-trek-enterprise/seasons/2",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
