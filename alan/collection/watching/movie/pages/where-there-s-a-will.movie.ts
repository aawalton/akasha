import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const whereThereSAWill = {
  id: "01a17497-382b-798b-b899-1f4ed6f40fd5",
  type: "page-type/movie",
  slug: "where-there-s-a-will",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2006-05-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "165646",
      externalLink: "https://www.themoviedb.org/movie/165646",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Where There's a Will",
  genres: ["Comedy", "Drama", "TV Movie"],
  imdbId: "tt0399301",
  posterPath: "/gOF9dKDQl0ZI8JfiyEwI3zYnjt8.jpg",
  voteAverage: 7.1,
  streamingOn: ["Xumo Play"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
