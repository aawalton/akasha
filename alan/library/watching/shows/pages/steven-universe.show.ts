import type { Show } from "../show.page-type.ts"

export const stevenUniverse = {
  id: "01a06802-9332-703c-8150-160c00975384",
  pageTypeSlug: "show",
  slug: "steven-universe",
  title: "Steven Universe",
  partOfSlugs: ["cultural-literacy"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2013-11-05",
  externalLink: "https://trakt.tv/shows/steven-universe",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
