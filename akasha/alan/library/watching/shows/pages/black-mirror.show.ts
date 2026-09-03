import type { Show } from "../show.page-type.ts"

export const blackMirror = {
  id: "01a06802-9331-700b-997a-b4fca1a11bde",
  pageTypeSlug: "show",
  slug: "black-mirror",
  title: "Black Mirror",
  partOfSlugs: ["speculative-antholoagies"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2011-12-04",
  externalLink: "https://trakt.tv/shows/black-mirror",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
