import type { Season } from "../season.page-type.ts"

export const ncisSeason7 = {
  id: "01a06802-b8bb-7034-a4fc-a16d985d83cd",
  pageTypeSlug: "season",
  slug: "ncis-season-7",
  title: "NCIS Season 7",
  partOfSlugs: ["ncis"],
  position: 7,
  ownLength: 1045.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2009-09-23",
  externalId: "trakt-season-14546",
  externalLink: "https://trakt.tv/shows/ncis/seasons/7",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
