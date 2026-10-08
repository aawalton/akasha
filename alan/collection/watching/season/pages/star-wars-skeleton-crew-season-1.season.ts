import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starWarsSkeletonCrewSeason1 = {
  id: "01a06802-b8bd-7037-937b-0d59df6ca329",
  type: "page-type/season",
  slug: "star-wars-skeleton-crew-season-1",
  title: "Star Wars: Skeleton Crew Season 1",
  partOfCollections: ["show/skeleton-crew"],
  position: 1,
  ownLength: 316.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2024-12-03",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-295476",
      externalLink: "https://trakt.tv/shows/star-wars-skeleton-crew/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.965Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Season
