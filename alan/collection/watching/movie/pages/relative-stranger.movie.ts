import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const relativeStranger = {
  id: "01a17499-470e-79ea-b927-c98b1ece2a04",
  type: "page-type/movie",
  slug: "relative-stranger",
  ownLength: 89,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2009-03-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "248170",
      externalLink: "https://www.themoviedb.org/movie/248170",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Relative Stranger",
  genres: ["Drama", "TV Movie"],
  imdbId: "tt1252330",
  posterPath: "/lEzNJqlqbnIqlQhszTtJ5Dq6vmM.jpg",
  voteAverage: 4.4,
  streamingOn: ["Xumo Play"],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
