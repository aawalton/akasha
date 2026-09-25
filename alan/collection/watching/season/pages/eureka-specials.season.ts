import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const eurekaSpecials = {
  id: "01a06802-b8b9-7041-8833-3ae7debc5c89",
  type: "page-type/season",
  slug: "eureka-specials",
  title: "Eureka Specials",
  partOfCollections: ["show/eureka"],
  position: 0,
  ownLength: 837,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2010-07-09",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "0",
      externalLink: "https://trakt.tv/shows/eureka/seasons/0",
      lastSyncedAt: "2025-12-19",
    },
  ],
} as const satisfies Season
