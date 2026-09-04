import type { Show } from "../show.page-type.ts"

export const obiWanKenobi = {
  id: "01a06802-9332-7013-bb71-3cb4e588b312",
  pageTypeSlug: "show",
  slug: "obi-wan-kenobi",
  title: "Obi-Wan Kenobi",
  partOfSlugs: ["star-wars-2"],
  position: 19,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2022-05-26",
  externalLink: "https://trakt.tv/shows/obi-wan-kenobi",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
