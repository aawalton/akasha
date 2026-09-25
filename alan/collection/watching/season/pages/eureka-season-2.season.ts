import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const eurekaSeason2 = {
  id: "01a06802-b8b9-703d-911c-34179b4f8399",
  type: "page-type/season",
  slug: "eureka-season-2",
  title: "Eureka Season 2",
  partOfCollections: ["show/eureka"],
  position: 2,
  ownLength: 566,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2007-07-10",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "2",
      externalLink: "https://trakt.tv/shows/eureka/seasons/2",
      lastSyncedAt: "2025-12-19",
    },
  ],
} as const satisfies Season
