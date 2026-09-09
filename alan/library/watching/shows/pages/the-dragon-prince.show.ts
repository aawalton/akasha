import type { Show } from "../show.page-type.ts"

export const theDragonPrince = {
  id: "01a06802-9332-7046-a949-e1495f6818fc",
  pageTypeSlug: "show",
  type: "show",
  slug: "the-dragon-prince",
  title: "The Dragon Prince",
  partOfCollections: ["family-friendly-shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "not-started",
  publishedAt: "2018-09-14",
  externalLink: "https://trakt.tv/shows/the-dragon-prince",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
