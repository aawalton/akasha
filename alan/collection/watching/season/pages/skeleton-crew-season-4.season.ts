import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const skeletonCrewSeason4 = {
  id: "01a18852-196d-7261-ac0b-a97b6a0b0b8f",
  type: "page-type/season",
  slug: "skeleton-crew-season-4",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/skeleton-crew"],
  position: 4,
  publishedAt: "2018-12-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "337997",
      externalLink: "https://www.themoviedb.org/tv/225011/season/4",
    },
  ],
  title: "Skeleton Crew Season 4",
  posterPath: "/o5X3LJkz7uTZAbKePisi91nYCL4.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Season
