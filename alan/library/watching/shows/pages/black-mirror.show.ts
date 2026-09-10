import type { Show } from "../show.page-type.types.ts"

export const blackMirror = {
  id: "01a06802-9331-700b-997a-b4fca1a11bde",
  pageTypeSlug: "show",
  type: "show",
  slug: "black-mirror",
  title: "Black Mirror",
  partOfCollections: ["speculative-antholoagies"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "not-started",
  publishedAt: "2011-12-04",
  externalLink: "https://trakt.tv/shows/black-mirror",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
