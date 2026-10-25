import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mendingFences = {
  id: "01a17499-470d-76be-887e-cf251d96f990",
  type: "page-type/movie",
  slug: "mending-fences",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2009-07-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "310417",
      externalLink: "https://www.themoviedb.org/movie/310417",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Mending_Fences" },
  ],
  title: "Mending Fences",
  genres: ["Drama", "TV Movie"],
  imdbId: "tt1323030",
  posterPath: "/t175SDPk3ZDtNG0MmUg4J3l4oR6.jpg",
  voteAverage: 5.1,
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
