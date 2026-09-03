import type { Show } from "../show.page-type.ts"

export const starTrekVoyager = {
  id: "01a06802-9332-7031-ab2c-cba2b6aafdb9",
  pageTypeSlug: "show",
  slug: "star-trek-voyager",
  title: "Star Trek: Voyager",
  partOfSlugs: ["star-trek-3"],
  position: 12,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1995-01-17",
  externalLink: "https://trakt.tv/shows/star-trek-voyager",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
