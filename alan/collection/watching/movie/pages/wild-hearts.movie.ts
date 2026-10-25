import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const wildHearts = {
  id: "01a17497-382b-7240-9d29-39eaba0ab254",
  type: "page-type/movie",
  slug: "wild-hearts",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2006-07-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "137310",
      externalLink: "https://www.themoviedb.org/movie/137310",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Wild_Hearts_(film)" },
  ],
  title: "Wild Hearts",
  genres: ["TV Movie", "Drama"],
  imdbId: "tt0472576",
  posterPath: "/qrC6EC0cQoZGEkO2TW9EJiYzy69.jpg",
  voteAverage: 6.3,
  streamingOn: ["PixL Amazon Channel", "Xumo Play"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
