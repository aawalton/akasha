import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const portraitOfLove = {
  id: "01a17499-8948-772f-8994-403724e9c04b",
  type: "page-type/movie",
  slug: "portrait-of-love",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2015-03-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "325060",
      externalLink: "https://www.themoviedb.org/movie/325060",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Portrait of Love",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt4364860",
  posterPath: "/3Oy3mwbU2SjFCsjaKIRqCwMAJ1c.jpg",
  voteAverage: 5.5,
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
