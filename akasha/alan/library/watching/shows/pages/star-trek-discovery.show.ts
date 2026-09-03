import type { Show } from "../show.page-type.ts"

export const starTrekDiscovery = {
  id: "01a06802-9332-7028-993e-f437d7ee55bc",
  pageTypeSlug: "show",
  slug: "star-trek-discovery",
  title: "Star Trek: Discovery",
  partOfSlugs: ["star-trek-3"],
  position: 20,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2017-09-24",
  externalLink: "https://trakt.tv/shows/star-trek-discovery",
  lastSyncedAt: "2025-10-02",
} as const satisfies Show
