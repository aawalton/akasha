import type { Season } from "../season.page-type.ts"

export const ncisSeason15 = {
  id: "01a06802-b8bb-7027-88bd-974214ae02b8",
  pageTypeSlug: "season",
  slug: "ncis-season-15",
  title: "NCIS Season 15",
  partOfSlugs: ["ncis"],
  position: 15,
  ownLength: 1024.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2017-09-27",
  externalId: "trakt-season-143917",
  externalLink: "https://trakt.tv/shows/ncis/seasons/15",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
