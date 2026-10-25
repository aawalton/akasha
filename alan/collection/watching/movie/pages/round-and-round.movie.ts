import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const roundAndRound = {
  id: "01a1749a-66c0-7bdf-8070-ebf0f201c1b0",
  type: "page-type/movie",
  slug: "round-and-round",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2023-12-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1180682",
      externalLink: "https://www.themoviedb.org/movie/1180682",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Round and Round",
  genres: ["TV Movie", "Romance", "Family", "Comedy"],
  imdbId: "tt29244163",
  posterPath: "/aD577q2UGNbVMQze5LM0bV755dP.jpg",
  voteAverage: 6.575,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
