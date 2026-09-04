import type { Season } from "../season.page-type.ts"

export const blueySeason1 = {
  id: "01a06802-b8b8-700b-9cb3-d04def56591f",
  pageTypeSlug: "season",
  slug: "bluey-season-1",
  title: "Bluey Season 1",
  partOfSlugs: ["bluey"],
  position: 1,
  ownLength: 364.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2018-09-30",
  externalId: "trakt-season-173086",
  externalLink: "https://trakt.tv/shows/bluey-2018/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
