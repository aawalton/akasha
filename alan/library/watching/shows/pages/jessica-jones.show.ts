import type { Show } from "../show.page-type.ts"

export const jessicaJones = {
  id: "01a06802-9332-7005-bc03-be4d4adbd25f",
  pageTypeSlug: "show",
  slug: "jessica-jones",
  title: "Jessica Jones",
  partOfSlugs: ["marvel-television"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2015-11-20",
  externalLink: "https://trakt.tv/shows/marvel-s-jessica-jones",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
