import type { Season } from "../season.page-type.ts"

export const ncisSeason1 = {
  id: "01a06802-b8bb-7021-98a0-82965c5577e8",
  pageTypeSlug: "season",
  slug: "ncis-season-1",
  title: "NCIS Season 1",
  partOfSlugs: ["ncis"],
  position: 1,
  ownLength: 1009.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2003-09-24",
  externalId: "trakt-season-14540",
  externalLink: "https://trakt.tv/shows/ncis/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
