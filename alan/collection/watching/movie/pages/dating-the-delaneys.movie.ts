import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const datingTheDelaneys = {
  id: "01a1749a-464a-7ab1-a5c8-4f272d2ff2ee",
  type: "page-type/movie",
  slug: "dating-the-delaneys",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2022-08-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1002370",
      externalLink: "https://www.themoviedb.org/movie/1002370",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Dating the Delaneys",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt20859028",
  posterPath: "/nVr5qI9eq9fT687clOPn9bBvbXa.jpg",
  voteAverage: 7.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
