import type { Season } from "../season.page-type.ts"

export const ncisSeason6 = {
  id: "01a06802-b8bb-7033-bcd3-c1188f944640",
  pageTypeSlug: "season",
  slug: "ncis-season-6",
  title: "NCIS Season 6",
  partOfSlugs: ["ncis"],
  position: 6,
  ownLength: 1095,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2008-09-24",
  externalId: "trakt-season-14545",
  externalLink: "https://trakt.tv/shows/ncis/seasons/6",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
