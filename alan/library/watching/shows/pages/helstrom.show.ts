import type { Show } from "../show.page-type.ts"

export const helstrom = {
  id: "01a06802-9331-702e-b4b4-921d71c00856",
  pageTypeSlug: "show",
  type: "show",
  slug: "helstrom",
  title: "Helstrom",
  partOfCollections: ["marvel-television"],
  position: 12,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "not-started",
  publishedAt: "2020-10-16",
  externalLink: "https://trakt.tv/shows/helstrom",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
