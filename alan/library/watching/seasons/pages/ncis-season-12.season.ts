import type { Season } from "../season.page-type.ts"

export const ncisSeason12 = {
  id: "01a06802-b8bb-7024-bbb1-4f4df2ce6312",
  pageTypeSlug: "season",
  slug: "ncis-season-12",
  title: "NCIS Season 12",
  partOfSlugs: ["ncis"],
  position: 12,
  ownLength: 1033.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2014-09-24",
  externalId: "trakt-season-91126",
  externalLink: "https://trakt.tv/shows/ncis/seasons/12",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
