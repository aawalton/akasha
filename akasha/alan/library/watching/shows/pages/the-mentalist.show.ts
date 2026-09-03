import type { Show } from "../show.page-type.ts"

export const theMentalist = {
  id: "01a06802-9332-704d-acc2-2f07248ff37c",
  pageTypeSlug: "show",
  slug: "the-mentalist",
  title: "The Mentalist",
  partOfSlugs: ["crime-investigation-shows", "watch-with-jen"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2008-09-24",
  externalId: "the-mentalist",
  externalLink: "https://trakt.tv/shows/the-mentalist",
  lastSyncedAt: "2026-01-01",
} as const satisfies Show
