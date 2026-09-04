import type { Season } from "../season.page-type.ts"

export const eurekaSeason3 = {
  id: "01a06802-b8b9-703e-8745-c23ba79f2085",
  pageTypeSlug: "season",
  slug: "eureka-season-3",
  title: "Eureka Season 3",
  partOfSlugs: ["eureka"],
  position: 3,
  ownLength: 789,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2008-07-29",
  externalId: "3",
  externalLink: "https://trakt.tv/shows/eureka/seasons/3",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
