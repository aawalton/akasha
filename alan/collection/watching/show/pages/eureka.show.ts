import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const eureka = {
  id: "01a06802-9331-7022-ac66-a13e868ec5b6",
  type: "page-type/show",
  slug: "eureka",
  title: "Eureka",
  partOfCollections: ["show-collection/speculative-antholoagies"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2006-07-18",
  externalIdentity: [
    { source: "trakt", externalLink: "https://trakt.tv/shows/eureka", lastSyncedAt: "2025-10-13" },
  ],
} as const satisfies Show
