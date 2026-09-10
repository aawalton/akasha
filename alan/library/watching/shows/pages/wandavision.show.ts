import type { Show } from "../show.page-type.types.ts"

export const wandavision = {
  id: "01a06802-9333-700c-9f9d-4e3ed12c2e92",
  pageTypeSlug: "show",
  type: "show",
  slug: "wandavision",
  title: "WandaVision",
  partOfCollections: ["marvel-cinematic-universe"],
  position: 28,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "completed",
  publishedAt: "2021-01-15",
  externalLink: "https://trakt.tv/shows/wandavision",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
