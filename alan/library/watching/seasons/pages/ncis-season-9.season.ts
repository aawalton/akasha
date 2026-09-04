import type { Season } from "../season.page-type.ts"

export const ncisSeason9 = {
  id: "01a06802-b8bb-7036-aa9d-cf706b49b457",
  pageTypeSlug: "season",
  slug: "ncis-season-9",
  title: "NCIS Season 9",
  partOfSlugs: ["ncis"],
  position: 9,
  ownLength: 1027.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2011-09-21",
  externalId: "trakt-season-14548",
  externalLink: "https://trakt.tv/shows/ncis/seasons/9",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
