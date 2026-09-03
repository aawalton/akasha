import type { Show } from "../show.page-type.ts"

export const ncisNewOrleans = {
  id: "01a06802-9332-700f-bd64-6fa7aa890cbe",
  pageTypeSlug: "show",
  slug: "ncis-new-orleans",
  title: "NCIS: New Orleans",
  partOfSlugs: ["ncis-2"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2014-09-24",
  externalLink: "https://trakt.tv/shows/ncis-new-orleans",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
