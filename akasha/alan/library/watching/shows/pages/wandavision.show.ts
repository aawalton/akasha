import type { Show } from "../show.page-type.ts"

export const wandavision = {
  id: "01a06802-9333-700c-9f9d-4e3ed12c2e92",
  pageTypeSlug: "show",
  slug: "wandavision",
  title: "WandaVision",
  partOfSlugs: ["marvel-cinematic-universe"],
  position: 28,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2021-01-15",
  externalLink: "https://trakt.tv/shows/wandavision",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
