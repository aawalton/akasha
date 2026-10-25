import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const tidingsForTheSeason = {
  id: "01a1749a-a94e-79e2-b531-00d04a78f1e9",
  type: "page-type/movie",
  slug: "tidings-for-the-season",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2025-11-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1547915",
      externalLink: "https://www.themoviedb.org/movie/1547915",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Tidings for the Season",
  genres: ["Romance", "Drama", "TV Movie"],
  imdbId: "tt38353925",
  posterPath: "/8B59ieVpMESoKNircV4GyvdJ48U.jpg",
  voteAverage: 5.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-25T19:47:35.367Z",
} as const satisfies Movie
