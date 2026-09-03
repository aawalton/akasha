import type { Season } from "../season.page-type.ts"

export const eurekaSeason5 = {
  id: "01a06802-b8b9-7040-93ca-c4464869a3ef",
  pageTypeSlug: "season",
  slug: "eureka-season-5",
  title: "Eureka Season 5",
  partOfSlugs: ["eureka"],
  position: 5,
  ownLength: 559,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2012-04-16",
  externalId: "5",
  externalLink: "https://trakt.tv/shows/eureka/seasons/5",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
