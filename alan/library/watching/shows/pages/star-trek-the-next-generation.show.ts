import type { Show } from "../show.page-type.ts"

export const starTrekTheNextGeneration = {
  id: "01a06802-9332-7030-a2a0-00e89b525515",
  pageTypeSlug: "show",
  slug: "star-trek-the-next-generation",
  title: "Star Trek: The Next Generation",
  partOfSlugs: ["star-trek-3"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "paused",
  rank: "B",
  publishedAt: "1987-09-28",
  externalLink: "https://trakt.tv/shows/star-trek-the-next-generation",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
