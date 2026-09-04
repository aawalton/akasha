import type { Season } from "../season.page-type.ts"

export const ncisSeason4 = {
  id: "01a06802-b8bb-7031-b805-b67a14a3a955",
  pageTypeSlug: "season",
  slug: "ncis-season-4",
  title: "NCIS Season 4",
  partOfSlugs: ["ncis"],
  position: 4,
  ownLength: 1051.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2006-09-20",
  externalId: "trakt-season-14543",
  externalLink: "https://trakt.tv/shows/ncis/seasons/4",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
