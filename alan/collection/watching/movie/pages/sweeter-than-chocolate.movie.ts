import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const sweeterThanChocolate = {
  id: "01a1749a-66c0-769f-a67e-8570bb80ecf3",
  type: "page-type/movie",
  slug: "sweeter-than-chocolate",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2023-02-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1068817",
      externalLink: "https://www.themoviedb.org/movie/1068817",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Sweeter Than Chocolate",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt25391002",
  posterPath: "/lrzaNZgwftpiGO29LnUajnTyD1l.jpg",
  voteAverage: 5.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
