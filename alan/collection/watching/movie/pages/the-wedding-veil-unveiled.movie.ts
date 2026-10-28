import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theWeddingVeilUnveiled = {
  id: "01a1749a-464e-7c5b-bc36-9f5fa2604ae1",
  type: "page-type/movie",
  slug: "the-wedding-veil-unveiled",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/the-wedding-veil"],
  position: 2,
  publishedAt: "2022-02-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "910777",
      externalLink: "https://www.themoviedb.org/movie/910777",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Wedding Veil Unveiled",
  genres: ["TV Movie", "Comedy", "Romance", "Drama"],
  imdbId: "tt17524476",
  posterPath: "/zEpS5YQeWCEWMBSJvmsschfqLwp.jpg",
  voteAverage: 7.1,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
    "streaming-service/plex",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
