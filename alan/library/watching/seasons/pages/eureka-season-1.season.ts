import type { Season } from "../season.page-type.types.ts"

export const eurekaSeason1 = {
  id: "01a06802-b8b9-703c-b6ea-da3a59e37c3e",
  pageTypeSlug: "season",
  type: "season",
  slug: "eureka-season-1",
  title: "Eureka Season 1",
  partOfCollections: ["eureka"],
  position: 1,
  ownLength: 560,
  ownProgress: 0,
  unit: "minutes",
  status: "not-started",
  publishedAt: "2006-07-18",
  externalId: "1",
  externalLink: "https://trakt.tv/shows/eureka/seasons/1",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
