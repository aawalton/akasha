import type { Show } from "../show.page-type.types.ts"

export const warehouse13 = {
  id: "01a06802-9333-700d-84e5-37530b01da74",
  pageTypeSlug: "show",
  type: "show",
  slug: "warehouse-13",
  title: "Warehouse 13",
  partOfCollections: ["speculative-antholoagies"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "not-started",
  publishedAt: "2009-07-08",
  externalLink: "https://trakt.tv/shows/warehouse-13",
  lastSyncedAt: "2025-10-13",
} as const satisfies Show
