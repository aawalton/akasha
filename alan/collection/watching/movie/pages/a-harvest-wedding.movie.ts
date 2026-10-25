import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aHarvestWedding = {
  id: "01a17499-c95a-7493-b371-11a42225269b",
  type: "page-type/movie",
  slug: "a-harvest-wedding",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2017-10-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "479054",
      externalLink: "https://www.themoviedb.org/movie/479054",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Harvest Wedding",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt7418206",
  posterPath: "/kFmZdxLAb5qnx5yGm8rpBR3cKT0.jpg",
  voteAverage: 6,
  streamingOn: ["Philo", "YouTube TV", "fuboTV"],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
