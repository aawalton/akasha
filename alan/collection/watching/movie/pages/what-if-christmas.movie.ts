import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const whatIfChristmas = {
  id: "01a1749a-c86c-7180-8e09-ea774156ec68",
  type: "page-type/movie",
  slug: "what-if-christmas",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2026-10-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1773380",
      externalLink: "https://www.themoviedb.org/movie/1773380",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "What If Christmas",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt46072491",
  posterPath: "/bUrjqVO5nCW3OYa7QIt7nMXqs6m.jpg",
  voteAverage: 0,
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
