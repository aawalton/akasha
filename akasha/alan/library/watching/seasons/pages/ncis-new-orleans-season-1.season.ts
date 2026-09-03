import type { Season } from "../season.page-type.ts"

export const ncisNewOrleansSeason1 = {
  id: "01a06802-b8bb-7019-9e5e-06b4c6766192",
  pageTypeSlug: "season",
  slug: "ncis-new-orleans-season-1",
  title: "NCIS: New Orleans Season 1",
  partOfSlugs: ["ncis-new-orleans"],
  position: 1,
  ownLength: 1035,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2014-09-24",
  externalId: "trakt-season-62317",
  externalLink: "https://trakt.tv/shows/ncis-new-orleans/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
