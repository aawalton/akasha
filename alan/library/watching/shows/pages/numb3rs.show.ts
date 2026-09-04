import type { Show } from "../show.page-type.ts"

export const numb3rs = {
  id: "01a06802-9332-7012-aa15-d78084de1843",
  pageTypeSlug: "show",
  slug: "numb3rs",
  title: "Numb3rs",
  partOfSlugs: ["crime-investigation-shows"],
  position: 11,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2005-01-24",
  externalLink: "https://trakt.tv/shows/numb3rs",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
