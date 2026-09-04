import type { Show } from "../show.page-type.ts"

export const theBigBangTheory = {
  id: "01a06802-9332-7042-bab6-4bb636b043cc",
  pageTypeSlug: "show",
  slug: "the-big-bang-theory",
  title: "The Big Bang Theory",
  partOfSlugs: ["sitcoms"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2007-09-24",
  externalLink: "https://trakt.tv/shows/the-big-bang-theory",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
