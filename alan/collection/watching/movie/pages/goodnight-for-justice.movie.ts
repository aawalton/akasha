import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const goodnightForJustice = {
  id: "01a17499-669e-74ca-933b-2876ea1ac9f6",
  type: "page-type/movie",
  slug: "goodnight-for-justice",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["franchise/goodnight-for-justice"],
  position: 1,
  publishedAt: "2011-01-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "61794",
      externalLink: "https://www.themoviedb.org/movie/61794",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Goodnight for Justice",
  genres: ["Action", "Western", "TV Movie"],
  imdbId: "tt1716743",
  posterPath: "/xPFP8Sb0gBTbjDHi596MJgME1R8.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T20:44:59.267Z",
} as const satisfies Movie
