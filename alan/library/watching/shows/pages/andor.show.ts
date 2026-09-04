import type { Show } from "../show.page-type.ts"

export const andor = {
  id: "01a06802-9331-7005-b34b-e628e5eba5a9",
  pageTypeSlug: "show",
  slug: "andor",
  title: "Andor",
  partOfSlugs: ["star-wars-2"],
  position: 20,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2022-09-21",
  externalLink: "https://trakt.tv/shows/star-wars-andor",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
