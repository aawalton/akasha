import type { Show } from "../show.page-type.ts"

export const galactica1980 = {
  id: "01a06802-9331-7029-a507-718aab929aaf",
  pageTypeSlug: "show",
  slug: "galactica-1980",
  title: "Galactica 1980",
  partOfSlugs: ["battlestar-galactica"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1980-01-28",
  externalLink: "https://trakt.tv/shows/galactica-1980",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
