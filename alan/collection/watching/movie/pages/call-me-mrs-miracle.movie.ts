import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const callMeMrsMiracle = {
  id: "01a17499-470b-734c-9025-c9efa3af172b",
  type: "page-type/movie",
  slug: "call-me-mrs-miracle",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["franchise/mrs-miracle"],
  position: 2,
  publishedAt: "2010-11-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "78059",
      externalLink: "https://www.themoviedb.org/movie/78059",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Call Me Mrs. Miracle",
  genres: ["TV Movie", "Fantasy", "Drama", "Family", "Comedy"],
  imdbId: "tt1708459",
  posterPath: "/qwVwpK2xIUzRfgrlSHiwIfIdHie.jpg",
  voteAverage: 5.899,
  streamingOn: ["fuboTV"],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T20:44:55.748Z",
} as const satisfies Movie
