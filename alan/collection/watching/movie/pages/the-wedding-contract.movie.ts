import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theWeddingContract = {
  id: "01a1749a-66c1-7b07-8e1d-b7d4106434c6",
  type: "page-type/movie",
  slug: "the-wedding-contract",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2023-06-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1119750",
      externalLink: "https://www.themoviedb.org/movie/1119750",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Wedding Contract",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt27812140",
  posterPath: "/qRf0OkF7QcwwYmP4thgnU7ArZet.jpg",
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
