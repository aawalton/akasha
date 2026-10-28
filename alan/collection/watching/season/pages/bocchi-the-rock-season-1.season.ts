import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const bocchiTheRockSeason1 = {
  id: "01a183d9-6b68-723f-b3b0-c55d6053707b",
  type: "page-type/season",
  slug: "bocchi-the-rock-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/bocchi-the-rock"],
  position: 1,
  publishedAt: "2022-10-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "182218",
      externalLink: "https://www.themoviedb.org/tv/119100/season/1",
    },
  ],
  title: "BOCCHI THE ROCK! Season 1",
  posterPath: "/oWp9LhbfXV579OqA33SziSQQEuX.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-28T18:50:26.535Z",
  updatedAt: "2026-10-28T18:50:26.535Z",
} as const satisfies Season
