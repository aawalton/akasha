import type { Season } from "../season.page-type.ts"

export const highPotentialSeason1 = {
  id: "01a06802-b8ba-7025-b088-2d8acf31fbfb",
  pageTypeSlug: "season",
  slug: "high-potential-season-1",
  title: "High Potential Season 1",
  partOfSlugs: ["high-potential"],
  position: 1,
  ownLength: 576,
  ownProgress: 576,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2024-09-18",
  externalId: "trakt-season-324301",
  externalLink: "https://trakt.tv/shows/high-potential/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
