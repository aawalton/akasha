import type { Season } from "../season.page-type.ts"

export const warehouse13Season1 = {
  id: "01a06802-b8c0-7010-99dd-50f7f0d7e25c",
  pageTypeSlug: "season",
  slug: "warehouse-13-season-1",
  title: "Warehouse 13 Season 1",
  partOfSlugs: ["warehouse-13"],
  position: 1,
  ownLength: 571,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2009-07-08",
  externalId: "1",
  externalLink: "https://trakt.tv/shows/warehouse-13/seasons/1",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
