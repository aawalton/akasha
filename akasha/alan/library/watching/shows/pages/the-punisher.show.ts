import type { Show } from "../show.page-type.ts"

export const thePunisher = {
  id: "01a06802-9333-7000-b8a0-89cec056daea",
  pageTypeSlug: "show",
  slug: "the-punisher",
  title: "The Punisher",
  partOfSlugs: ["marvel-television"],
  position: 9,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2017-11-17",
  externalLink: "https://trakt.tv/shows/marvel-s-the-punisher",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
