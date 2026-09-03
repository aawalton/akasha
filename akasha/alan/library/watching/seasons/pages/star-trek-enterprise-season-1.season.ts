import type { Season } from "../season.page-type.ts"

export const starTrekEnterpriseSeason1 = {
  id: "01a06802-b8bc-7053-9962-354264b894fc",
  pageTypeSlug: "season",
  slug: "star-trek-enterprise-season-1",
  title: "Star Trek: Enterprise Season 1",
  partOfSlugs: ["star-trek-enterprise"],
  position: 1,
  ownLength: 1144.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2001-09-27",
  externalLink: "https://trakt.tv/shows/star-trek-enterprise/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
