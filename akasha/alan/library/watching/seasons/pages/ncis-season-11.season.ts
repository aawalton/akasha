import type { Season } from "../season.page-type.ts"

export const ncisSeason11 = {
  id: "01a06802-b8bb-7023-8f77-5e9f1a885c52",
  pageTypeSlug: "season",
  slug: "ncis-season-11",
  title: "NCIS Season 11",
  partOfSlugs: ["ncis"],
  position: 11,
  ownLength: 1029,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2013-09-25",
  externalId: "trakt-season-14550",
  externalLink: "https://trakt.tv/shows/ncis/seasons/11",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
