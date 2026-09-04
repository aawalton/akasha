import type { Show } from "../show.page-type.ts"

export const personOfInterest = {
  id: "01a06802-9332-7016-86c3-6bc4582323ae",
  pageTypeSlug: "show",
  slug: "person-of-interest",
  title: "Person of Interest",
  partOfSlugs: ["science-fiction-shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2011-09-23",
  externalLink: "https://trakt.tv/shows/person-of-interest",
  lastSyncedAt: "2025-10-13",
} as const satisfies Show
