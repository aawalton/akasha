import type { Show } from "../show.page-type.ts"

export const obiWanKenobi = {
  id: "01a06802-9332-7013-bb71-3cb4e588b312",
  pageTypeSlug: "show",
  type: "show",
  slug: "obi-wan-kenobi",
  title: "Obi-Wan Kenobi",
  partOfCollections: ["star-wars-2"],
  position: 19,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "not-started",
  publishedAt: "2022-05-26",
  externalLink: "https://trakt.tv/shows/obi-wan-kenobi",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
