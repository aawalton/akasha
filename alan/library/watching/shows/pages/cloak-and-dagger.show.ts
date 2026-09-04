import type { Show } from "../show.page-type.ts"

export const cloakAndDagger = {
  id: "01a06802-9331-7011-8e99-155246c47b6e",
  pageTypeSlug: "show",
  slug: "cloak-and-dagger",
  title: "Cloak & Dagger",
  partOfSlugs: ["marvel-television"],
  position: 11,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2018-06-08",
  externalLink: "https://trakt.tv/shows/marvel-s-cloak-dagger",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
