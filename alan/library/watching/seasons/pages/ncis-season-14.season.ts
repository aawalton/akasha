import type { Season } from "../season.page-type.ts"

export const ncisSeason14 = {
  id: "01a06802-b8bb-7026-b10d-7dc65db5e151",
  pageTypeSlug: "season",
  slug: "ncis-season-14",
  title: "NCIS Season 14",
  partOfSlugs: ["ncis"],
  position: 14,
  ownLength: 1015.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2016-09-21",
  externalId: "trakt-season-128586",
  externalLink: "https://trakt.tv/shows/ncis/seasons/14",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
