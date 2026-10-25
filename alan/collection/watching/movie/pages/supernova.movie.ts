import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const supernova = {
  id: "01a17497-382a-7658-b167-54d9c0d37e7b",
  type: "page-type/movie",
  slug: "supernova",
  ownLength: 172,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2005-09-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "42904",
      externalLink: "https://www.themoviedb.org/movie/42904",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Supernova_(2005_film)" },
  ],
  title: "Supernova",
  genres: ["Science Fiction", "Action", "Drama", "TV Movie"],
  imdbId: "tt0419373",
  posterPath: "/jdHJKwwGE9bLLItExwN7Uzfb9aP.jpg",
  voteAverage: 4.236,
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
