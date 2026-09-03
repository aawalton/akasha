import type { Show } from "../show.page-type.ts"

export const studioC = {
  id: "01a06802-9332-703e-bf45-659f474888d4",
  pageTypeSlug: "show",
  slug: "studio-c",
  title: "Studio C",
  partOfSlugs: ["comedy-shows", "watch-with-lizzy"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "following",
  rank: "C",
  publishedAt: "2012-10-07",
  externalLink: "https://trakt.tv/shows/studio-c",
  lastSyncedAt: "2026-01-20",
} as const satisfies Show
