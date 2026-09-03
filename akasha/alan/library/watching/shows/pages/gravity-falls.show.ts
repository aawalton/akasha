import type { Show } from "../show.page-type.ts"

export const gravityFalls = {
  id: "01a06802-9331-702c-b050-bde2ea2b2bf2",
  pageTypeSlug: "show",
  slug: "gravity-falls",
  title: "Gravity Falls",
  partOfSlugs: ["family-friendly-shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2012-06-15",
  externalLink: "https://trakt.tv/shows/gravity-falls",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
