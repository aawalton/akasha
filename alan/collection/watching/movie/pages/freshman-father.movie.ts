import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const freshmanFather = {
  id: "01a17499-470c-786c-b36b-3a26d738a4bb",
  type: "page-type/movie",
  slug: "freshman-father",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2010-06-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "127717",
      externalLink: "https://www.themoviedb.org/movie/127717",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Freshman Father",
  genres: ["Drama", "TV Movie"],
  imdbId: "tt1525359",
  posterPath: "/jIPnqEjymedN27oewL8ujqL6mRZ.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
