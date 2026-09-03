import type { Show } from "../show.page-type.ts"

export const eureka = {
  id: "01a06802-9331-7022-ac66-a13e868ec5b6",
  pageTypeSlug: "show",
  slug: "eureka",
  title: "Eureka",
  partOfSlugs: ["speculative-antholoagies"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2006-07-18",
  externalLink: "https://trakt.tv/shows/eureka",
  lastSyncedAt: "2025-10-13",
} as const satisfies Show
