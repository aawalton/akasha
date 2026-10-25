import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const janeDoeTiesThatBind = {
  id: "01a17497-3826-76f1-95fa-edc4e3fe7bba",
  type: "page-type/movie",
  slug: "jane-doe-ties-that-bind",
  ownLength: 80,
  ownProgress: 0,
  partOfCollections: ["franchise/jane-doe"],
  position: 6,
  publishedAt: "2007-03-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "95390",
      externalLink: "https://www.themoviedb.org/movie/95390",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Jane Doe: Ties That Bind",
  genres: ["TV Movie", "Mystery", "Drama"],
  imdbId: "tt0823477",
  posterPath: "/wIzP0uFK3jr19abOskSmeSKUovp.jpg",
  voteAverage: 5.2,
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
