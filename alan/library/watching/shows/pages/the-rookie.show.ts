import type { Show } from "../show.page-type.types.ts"

export const theRookie = {
  id: "01a06802-9333-7001-9632-ca9706fe386d",
  pageTypeSlug: "show",
  type: "show",
  slug: "the-rookie",
  title: "The Rookie",
  partOfCollections: ["crime-investigation-shows", "watch-with-jen"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "in-progress",
  publishedAt: "2018-10-17",
  externalLink: "https://trakt.tv/shows/the-rookie-2018",
  lastSyncedAt: "2025-11-13",
} as const satisfies Show
