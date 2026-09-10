import type { Season } from "../season.page-type.types.ts"

export const starTrekEnterpriseSeason4 = {
  id: "01a06802-b8bd-7001-b34a-f2cb0a436ad4",
  pageTypeSlug: "season",
  type: "season",
  slug: "star-trek-enterprise-season-4",
  title: "Star Trek: Enterprise Season 4",
  partOfCollections: ["star-trek-enterprise"],
  position: 4,
  ownLength: 946.2,
  ownProgress: 0,
  unit: "minutes",
  status: "not-started",
  publishedAt: "2004-10-09",
  externalLink: "https://trakt.tv/shows/star-trek-enterprise/seasons/4",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
