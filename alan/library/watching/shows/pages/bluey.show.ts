import type { Show } from "../show.page-type.ts"

export const bluey = {
  id: "01a06802-9331-700c-844b-973b801b3349",
  pageTypeSlug: "show",
  slug: "bluey",
  title: "Bluey",
  partOfSlugs: ["family-friendly-shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2018-10-01",
  externalLink: "https://trakt.tv/shows/bluey-2018",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
