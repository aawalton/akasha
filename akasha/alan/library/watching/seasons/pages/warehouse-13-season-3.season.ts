import type { Season } from "../season.page-type.ts"

export const warehouse13Season3 = {
  id: "01a06802-b8c0-7012-83bd-d0bb01e8c9fa",
  pageTypeSlug: "season",
  slug: "warehouse-13-season-3",
  title: "Warehouse 13 Season 3",
  partOfSlugs: ["warehouse-13"],
  position: 3,
  ownLength: 560,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2011-07-12",
  externalId: "3",
  externalLink: "https://trakt.tv/shows/warehouse-13/seasons/3",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
