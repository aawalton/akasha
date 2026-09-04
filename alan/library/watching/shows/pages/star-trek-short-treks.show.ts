import type { Show } from "../show.page-type.ts"

export const starTrekShortTreks = {
  id: "01a06802-9332-702d-b081-9741b5369c0e",
  pageTypeSlug: "show",
  slug: "star-trek-short-treks",
  title: "Star Trek: Short Treks",
  partOfSlugs: ["star-trek-3"],
  position: 21,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2018-10-03",
  externalLink: "https://trakt.tv/shows/star-trek-short-treks",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
