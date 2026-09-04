import type { Show } from "../show.page-type.ts"

export const upload = {
  id: "01a06802-9333-700b-9e2d-443f54b562cb",
  pageTypeSlug: "show",
  slug: "upload",
  title: "Upload",
  partOfSlugs: ["science-fiction-shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2020-04-30",
  externalLink: "https://trakt.tv/shows/upload",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
