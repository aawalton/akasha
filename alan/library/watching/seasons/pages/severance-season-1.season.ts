import type { Season } from "../season.page-type.ts"

export const severanceSeason1 = {
  id: "01a06802-b8bc-7033-b104-fd3e2c7e5500",
  pageTypeSlug: "season",
  slug: "severance-season-1",
  title: "Severance Season 1",
  partOfSlugs: ["severance"],
  position: 1,
  ownLength: 430.2,
  ownProgress: 430.2,
  unitSlug: "minutes",
  status: "completed",
  rank: "A",
  publishedAt: "2022-02-18",
  externalLink: "https://trakt.tv/shows/severance/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
