import type { Show } from "../show.page-type.ts"

export const theAcolyte = {
  id: "01a06802-9332-7041-914f-5b6bcd175b90",
  pageTypeSlug: "show",
  slug: "the-acolyte",
  title: "The Acolyte",
  partOfSlugs: ["star-wars-2"],
  position: 23,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2024-06-05",
  externalLink: "https://trakt.tv/shows/the-acolyte",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
