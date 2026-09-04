import type { Season } from "../season.page-type.ts"

export const ncisSeason3 = {
  id: "01a06802-b8bb-7030-a752-17303d1f8a42",
  pageTypeSlug: "season",
  slug: "ncis-season-3",
  title: "NCIS Season 3",
  partOfSlugs: ["ncis"],
  position: 3,
  ownLength: 1054.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2005-09-21",
  externalId: "trakt-season-14542",
  externalLink: "https://trakt.tv/shows/ncis/seasons/3",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
