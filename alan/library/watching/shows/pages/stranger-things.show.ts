import type { Show } from "../show.page-type.ts"

export const strangerThings = {
  id: "01a06802-9332-703d-9427-f3f98f74053c",
  pageTypeSlug: "show",
  slug: "stranger-things",
  title: "Stranger Things",
  partOfSlugs: ["award-winning-shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2016-07-15",
  externalLink: "https://trakt.tv/shows/stranger-things",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
