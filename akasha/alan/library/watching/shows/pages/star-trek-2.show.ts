import type { Show } from "../show.page-type.ts"

export const starTrek2 = {
  id: "01a06802-9332-7026-ae57-05557f79b639",
  pageTypeSlug: "show",
  slug: "star-trek-2",
  title: "Star Trek",
  partOfSlugs: ["star-trek-3"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  rank: "B",
  publishedAt: "1966-09-08",
  externalLink: "https://trakt.tv/shows/star-trek",
  lastSyncedAt: "2025-10-02",
} as const satisfies Show
