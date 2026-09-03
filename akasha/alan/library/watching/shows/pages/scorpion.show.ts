import type { Show } from "../show.page-type.ts"

export const scorpion = {
  id: "01a06802-9332-701e-9723-78bc22667366",
  pageTypeSlug: "show",
  slug: "scorpion",
  title: "Scorpion",
  partOfSlugs: ["crime-investigation-shows"],
  position: 9,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2014-09-23",
  externalLink: "https://trakt.tv/shows/scorpion",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
