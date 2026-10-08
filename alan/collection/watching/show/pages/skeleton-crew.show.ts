import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const skeletonCrew = {
  id: "01a06802-9332-7023-b0a7-7e362e47fd14",
  type: "page-type/show",
  slug: "skeleton-crew",
  title: "Skeleton Crew",
  partOfCollections: ["fandom/star-wars-2"],
  position: 24,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2024-12-03",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-wars-skeleton-crew",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Show
