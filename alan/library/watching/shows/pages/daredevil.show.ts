import type { Show } from "../show.page-type.ts"

export const daredevil = {
  id: "01a06802-9331-7017-adc1-8d535db36d7b",
  pageTypeSlug: "show",
  slug: "daredevil",
  title: "Daredevil",
  partOfSlugs: ["marvel-television"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2015-04-10",
  externalLink: "https://trakt.tv/shows/marvel-s-daredevil",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
