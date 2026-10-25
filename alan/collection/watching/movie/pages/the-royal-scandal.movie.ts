import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theRoyalScandal = {
  id: "01a17497-195e-793a-8f43-612c72ffa3ca",
  type: "page-type/movie",
  slug: "the-royal-scandal",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2001-10-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "59013",
      externalLink: "https://www.themoviedb.org/movie/59013",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/The_Royal_Scandal" },
  ],
  title: "The Royal Scandal",
  genres: ["Crime", "Thriller", "Mystery", "TV Movie"],
  imdbId: "tt0281173",
  posterPath: "/fvLfMNFg7bW7SjKAuHXxtF8s3K1.jpg",
  voteAverage: 5.9,
  streamingOn: ["Cineverse"],
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Movie
