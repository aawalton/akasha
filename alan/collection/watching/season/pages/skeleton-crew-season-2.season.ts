import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const skeletonCrewSeason2 = {
  id: "01a18852-196d-77df-904c-48d0cbf0da19",
  type: "page-type/season",
  slug: "skeleton-crew-season-2",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/skeleton-crew"],
  position: 2,
  publishedAt: "2016-10-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "337995",
      externalLink: "https://www.themoviedb.org/tv/225011/season/2",
    },
  ],
  title: "Skeleton Crew Season 2",
  posterPath: "/o5X3LJkz7uTZAbKePisi91nYCL4.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Season
