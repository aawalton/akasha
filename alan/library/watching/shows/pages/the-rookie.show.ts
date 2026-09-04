import type { Show } from "../show.page-type.ts"

export const theRookie = {
  id: "01a06802-9333-7001-9632-ca9706fe386d",
  pageTypeSlug: "show",
  slug: "the-rookie",
  title: "The Rookie",
  partOfSlugs: ["crime-investigation-shows", "watch-with-jen"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "in-progress",
  publishedAt: "2018-10-17",
  externalLink: "https://trakt.tv/shows/the-rookie-2018",
  lastSyncedAt: "2025-11-13",
} as const satisfies Show
