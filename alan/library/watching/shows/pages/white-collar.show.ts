import type { Show } from "../show.page-type.ts"

export const whiteCollar = {
  id: "01a06802-9333-700f-b80e-6cbe38f0ebda",
  pageTypeSlug: "show",
  slug: "white-collar",
  title: "White Collar",
  partOfSlugs: ["crime-investigation-shows", "watch-with-jen"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2009-10-24",
  externalLink: "https://trakt.tv/shows/white-collar",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
