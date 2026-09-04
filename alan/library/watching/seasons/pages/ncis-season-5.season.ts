import type { Season } from "../season.page-type.ts"

export const ncisSeason5 = {
  id: "01a06802-b8bb-7032-956f-ede67a98c65c",
  pageTypeSlug: "season",
  slug: "ncis-season-5",
  title: "NCIS Season 5",
  partOfSlugs: ["ncis"],
  position: 5,
  ownLength: 835.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2007-09-26",
  externalId: "trakt-season-14544",
  externalLink: "https://trakt.tv/shows/ncis/seasons/5",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
