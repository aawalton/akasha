import type { Season } from "../season.page-type.ts"

export const warehouse13Season2 = {
  id: "01a06802-b8c0-7011-b3c0-960fb58a4efe",
  pageTypeSlug: "season",
  slug: "warehouse-13-season-2",
  title: "Warehouse 13 Season 2",
  partOfSlugs: ["warehouse-13"],
  position: 2,
  ownLength: 570,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2010-07-07",
  externalId: "2",
  externalLink: "https://trakt.tv/shows/warehouse-13/seasons/2",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
