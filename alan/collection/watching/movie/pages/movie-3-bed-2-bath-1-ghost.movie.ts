import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const movie3Bed2Bath1Ghost = {
  id: "01a1749a-66bf-79fe-a4b8-095e3d32dbc5",
  type: "page-type/movie",
  slug: "movie-3-bed-2-bath-1-ghost",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2023-10-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1160972",
      externalLink: "https://www.themoviedb.org/movie/1160972",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "3 Bed, 2 Bath, 1 Ghost",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt28818121",
  posterPath: "/hrOWLQxK7zXybn7RUqBRLYxzPqP.jpg",
  voteAverage: 7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
