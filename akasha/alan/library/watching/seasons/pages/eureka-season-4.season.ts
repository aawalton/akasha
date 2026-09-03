import type { Season } from "../season.page-type.ts"

export const eurekaSeason4 = {
  id: "01a06802-b8b9-703f-804a-62124e9007c3",
  pageTypeSlug: "season",
  slug: "eureka-season-4",
  title: "Eureka Season 4",
  partOfSlugs: ["eureka"],
  position: 4,
  ownLength: 922,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2010-07-09",
  externalId: "4",
  externalLink: "https://trakt.tv/shows/eureka/seasons/4",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
