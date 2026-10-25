import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const returnToSanta = {
  id: "01a1749a-c86a-7f96-9c99-1d3235d9d139",
  type: "page-type/movie",
  slug: "return-to-santa",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2026-11-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1773042",
      externalLink: "https://www.themoviedb.org/movie/1773042",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Return to Santa",
  genres: ["Romance", "Comedy", "TV Movie", "Fantasy"],
  imdbId: "tt46076498",
  voteAverage: 0,
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
