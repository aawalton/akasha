import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const skeletonCrewSeason5 = {
  id: "01a18852-196d-7386-b732-fc5c33698ac0",
  type: "page-type/season",
  slug: "skeleton-crew-season-5",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/skeleton-crew"],
  position: 5,
  publishedAt: "2021-07-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "337998",
      externalLink: "https://www.themoviedb.org/tv/225011/season/5",
    },
  ],
  title: "Skeleton Crew Season 5",
  posterPath: "/o5X3LJkz7uTZAbKePisi91nYCL4.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Season
