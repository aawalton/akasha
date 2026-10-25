import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theKingAndQueenOfMoonlightBay = {
  id: "01a17497-195e-76c8-a5a6-d353e6682399",
  type: "page-type/movie",
  slug: "the-king-and-queen-of-moonlight-bay",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2003-06-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "72232",
      externalLink: "https://www.themoviedb.org/movie/72232",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The King and Queen of Moonlight Bay",
  genres: ["Drama", "Family", "TV Movie"],
  imdbId: "tt0342639",
  posterPath: "/kwFRApNBxuF24s3bCj3gkABF4N0.jpg",
  voteAverage: 5.9,
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Movie
