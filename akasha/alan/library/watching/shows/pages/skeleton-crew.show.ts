import type { Show } from "../show.page-type.ts"

export const skeletonCrew = {
  id: "01a06802-9332-7023-b0a7-7e362e47fd14",
  pageTypeSlug: "show",
  slug: "skeleton-crew",
  title: "Skeleton Crew",
  partOfSlugs: ["star-wars-2"],
  position: 24,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2024-12-03",
  externalLink: "https://trakt.tv/shows/star-wars-skeleton-crew",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
