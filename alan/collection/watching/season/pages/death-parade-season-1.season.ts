import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const deathParadeSeason1 = {
  id: "01a183da-662b-7880-9e85-ea603f2c32cd",
  type: "page-type/season",
  slug: "death-parade-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/death-parade"],
  position: 1,
  publishedAt: "2015-01-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64600",
      externalLink: "https://www.themoviedb.org/tv/61901/season/1",
    },
  ],
  title: "Death Parade Season 1",
  posterPath: "/qeD9wDenN7CPA99FScSErJCvcWb.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-28T18:51:30.729Z",
  updatedAt: "2026-10-28T18:51:30.729Z",
} as const satisfies Season
