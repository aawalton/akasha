import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const stranded = {
  id: "01a17497-195d-70d1-be0d-3a8a273604aa",
  type: "page-type/movie",
  slug: "stranded",
  ownLength: 176,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2002-01-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "60517",
      externalLink: "https://www.themoviedb.org/movie/60517",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Stranded_(2002_film)" },
  ],
  title: "Stranded",
  genres: ["TV Movie", "Adventure", "Drama", "Thriller"],
  imdbId: "tt0286989",
  posterPath: "/qkpIbTtWge5GCqdlJ0Dj7Gt23Un.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Movie
