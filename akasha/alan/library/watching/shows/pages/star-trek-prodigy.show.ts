import type { Show } from "../show.page-type.ts"

export const starTrekProdigy = {
  id: "01a06802-9332-702c-9bec-661cd67a807c",
  pageTypeSlug: "show",
  slug: "star-trek-prodigy",
  title: "Star Trek: Prodigy",
  partOfSlugs: ["star-trek-3"],
  position: 24,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2021-10-28",
  externalLink: "https://trakt.tv/shows/star-trek-prodigy",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
