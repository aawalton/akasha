import type { Show } from "../show.page-type.ts"

export const lukeCage = {
  id: "01a06802-9332-7007-8220-a6c45b6077b0",
  pageTypeSlug: "show",
  slug: "luke-cage",
  title: "Luke Cage",
  partOfSlugs: ["marvel-television"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2016-09-30",
  externalLink: "https://trakt.tv/shows/marvel-s-luke-cage",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
