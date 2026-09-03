import type { Show } from "../show.page-type.ts"

export const starTrekDeepSpaceNine = {
  id: "01a06802-9332-7027-b141-6c49829dd910",
  pageTypeSlug: "show",
  slug: "star-trek-deep-space-nine",
  title: "Star Trek: Deep Space Nine",
  partOfSlugs: ["star-trek-3"],
  position: 10,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1993-01-03",
  externalLink: "https://trakt.tv/shows/star-trek-deep-space-nine",
  lastSyncedAt: "2025-10-02",
} as const satisfies Show
