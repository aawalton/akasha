import type { Show } from "../show.page-type.ts"

export const k9 = {
  id: "01a06802-9332-7006-a7c1-5478b0adcc79",
  pageTypeSlug: "show",
  slug: "k-9",
  title: "K-9",
  partOfSlugs: ["doctor-who"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2009-10-31",
  externalLink: "https://trakt.tv/shows/k-9",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
