import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mrsMiracle = {
  id: "01a17499-470d-76a8-acea-ff96a4c9a35e",
  type: "page-type/movie",
  slug: "mrs-miracle",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["franchise/mrs-miracle"],
  position: 0,
  publishedAt: "2009-12-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "50506",
      externalLink: "https://www.themoviedb.org/movie/50506",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Mrs. Miracle",
  genres: ["TV Movie", "Comedy", "Family", "Fantasy", "Romance"],
  imdbId: "tt1431115",
  posterPath: "/x4bgbJqRaiDC8wSPQNzVtn4iEsq.jpg",
  voteAverage: 6,
  streamingOn: ["fuboTV"],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
