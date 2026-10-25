import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theWeddingVeilInspiration = {
  id: "01a1749a-66c1-7f04-a6a7-eb2a1ffebdd3",
  type: "page-type/movie",
  slug: "the-wedding-veil-inspiration",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/the-wedding-veil"],
  position: 4,
  publishedAt: "2023-01-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1056737",
      externalLink: "https://www.themoviedb.org/movie/1056737",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Wedding Veil Inspiration",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt25134264",
  posterPath: "/tUbRVuZYKFm5qFDZDYWnVQRWEi4.jpg",
  voteAverage: 7.5,
  streamingOn: ["Philo", "fuboTV"],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
