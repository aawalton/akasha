import type { Season } from "../season.page-type.ts"

export const warehouse13Specials = {
  id: "01a06802-b8c0-7015-93ea-a80e244d1a2d",
  pageTypeSlug: "season",
  slug: "warehouse-13-specials",
  title: "Warehouse 13 Specials",
  partOfSlugs: ["warehouse-13"],
  position: 0,
  ownLength: 2540,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "2009-09-23",
  externalId: "0",
  externalLink: "https://trakt.tv/shows/warehouse-13/seasons/0",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
