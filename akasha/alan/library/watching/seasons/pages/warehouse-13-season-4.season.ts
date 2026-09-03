import type { Season } from "../season.page-type.ts"

export const warehouse13Season4 = {
  id: "01a06802-b8c0-7013-b52c-dd01ebae5968",
  pageTypeSlug: "season",
  slug: "warehouse-13-season-4",
  title: "Warehouse 13 Season 4",
  partOfSlugs: ["warehouse-13"],
  position: 4,
  ownLength: 860,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2012-07-24",
  externalId: "4",
  externalLink: "https://trakt.tv/shows/warehouse-13/seasons/4",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
