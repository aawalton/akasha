import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const skeletonCrewSeason3 = {
  id: "01a18852-196d-7339-b295-7ae94e1aa787",
  type: "page-type/season",
  slug: "skeleton-crew-season-3",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/skeleton-crew"],
  position: 3,
  publishedAt: "2017-11-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "337996",
      externalLink: "https://www.themoviedb.org/tv/225011/season/3",
    },
  ],
  title: "Skeleton Crew Season 3",
  posterPath: "/o5X3LJkz7uTZAbKePisi91nYCL4.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Season
