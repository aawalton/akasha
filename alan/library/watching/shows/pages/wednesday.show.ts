import type { Show } from "../show.page-type.ts"

export const wednesday = {
  id: "01a06802-9333-700e-9d40-1efa47023a87",
  pageTypeSlug: "show",
  slug: "wednesday",
  title: "Wednesday",
  partOfSlugs: ["award-winning-shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "following",
  rank: "A",
  publishedAt: "2022-11-23",
  externalLink: "https://trakt.tv/shows/wednesday",
  lastSyncedAt: "2026-01-02",
} as const satisfies Show
