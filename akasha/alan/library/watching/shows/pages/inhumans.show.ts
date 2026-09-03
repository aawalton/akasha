import type { Show } from "../show.page-type.ts"

export const inhumans = {
  id: "01a06802-9332-7002-a616-7758e81e4777",
  pageTypeSlug: "show",
  slug: "inhumans",
  title: "Inhumans",
  partOfSlugs: ["marvel-television"],
  position: 8,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2017-09-30",
  externalLink: "https://trakt.tv/shows/marvel-s-inhumans",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
