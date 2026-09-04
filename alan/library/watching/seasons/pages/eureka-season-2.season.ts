import type { Season } from "../season.page-type.ts"

export const eurekaSeason2 = {
  id: "01a06802-b8b9-703d-911c-34179b4f8399",
  pageTypeSlug: "season",
  slug: "eureka-season-2",
  title: "Eureka Season 2",
  partOfSlugs: ["eureka"],
  position: 2,
  ownLength: 566,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2007-07-10",
  externalId: "2",
  externalLink: "https://trakt.tv/shows/eureka/seasons/2",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
