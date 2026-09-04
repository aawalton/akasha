import type { Season } from "../season.page-type.ts"

export const eurekaSpecials = {
  id: "01a06802-b8b9-7041-8833-3ae7debc5c89",
  pageTypeSlug: "season",
  slug: "eureka-specials",
  title: "Eureka Specials",
  partOfSlugs: ["eureka"],
  position: 0,
  ownLength: 837,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "2010-07-09",
  externalId: "0",
  externalLink: "https://trakt.tv/shows/eureka/seasons/0",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
