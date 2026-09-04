import type { Show } from "../show.page-type.ts"

export const theDefenders = {
  id: "01a06802-9332-7045-8b44-b0f22d08a7a8",
  pageTypeSlug: "show",
  slug: "the-defenders",
  title: "The Defenders",
  partOfSlugs: ["marvel-television"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2017-08-18",
  externalLink: "https://trakt.tv/shows/marvel-s-the-defenders",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
