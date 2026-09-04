import type { Season } from "../season.page-type.ts"

export const accelWorldSpecials = {
  id: "01a06802-b8b7-700b-931f-8459ce15672d",
  pageTypeSlug: "season",
  slug: "accel-world-specials",
  title: "Accel World Specials",
  partOfSlugs: ["accel-world-2"],
  position: 0,
  ownLength: 80,
  ownProgress: 80,
  unitSlug: "minutes",
  status: "archived",
  rank: "B",
  publishedAt: "2012-07-24",
  externalLink: "https://trakt.tv/shows/accel-world/seasons/0",
  lastSyncedAt: "2025-10-13",
} as const satisfies Season
