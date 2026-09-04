import type { Show } from "../show.page-type.ts"

export const torchwood = {
  id: "01a06802-9333-700a-8b80-9b6c0238af99",
  pageTypeSlug: "show",
  slug: "torchwood",
  title: "Torchwood",
  partOfSlugs: ["doctor-who"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2006-10-22",
  externalLink: "https://trakt.tv/shows/torchwood",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
