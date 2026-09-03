import type { Show } from "../show.page-type.ts"

export const runaways = {
  id: "01a06802-9332-701a-896c-0975c653b0e6",
  pageTypeSlug: "show",
  slug: "runaways",
  title: "Runaways",
  partOfSlugs: ["marvel-television"],
  position: 10,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2017-11-21",
  externalLink: "https://trakt.tv/shows/marvel-s-runaways",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
