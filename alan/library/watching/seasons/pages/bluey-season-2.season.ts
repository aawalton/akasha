import type { Season } from "../season.page-type.ts"

export const blueySeason2 = {
  id: "01a06802-b8b8-700c-a257-a7dc8ed99bce",
  pageTypeSlug: "season",
  slug: "bluey-season-2",
  title: "Bluey Season 2",
  partOfSlugs: ["bluey"],
  position: 2,
  ownLength: 364.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2020-03-16",
  externalId: "trakt-season-211122",
  externalLink: "https://trakt.tv/shows/bluey-2018/seasons/2",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
