import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const anAngelInMyStocking = {
  id: "01a1749a-c868-7858-a3de-2d1b01673da5",
  type: "page-type/movie",
  slug: "an-angel-in-my-stocking",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2026-12-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1773280",
      externalLink: "https://www.themoviedb.org/movie/1773280",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "An Angel in My Stocking",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt46064715",
  voteAverage: 0,
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
