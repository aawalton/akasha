import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aDanishChristmas = {
  id: "01a1749a-c867-7040-a36a-31cfcfee0e3e",
  type: "page-type/movie",
  slug: "a-danish-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2026-11-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1773368",
      externalLink: "https://www.themoviedb.org/movie/1773368",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Danish Christmas",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt46066911",
  posterPath: "/1fdNNzXLhFW0uXfbK88bJGUi8HP.jpg",
  voteAverage: 0,
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
