import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const jingleBellSChristmasStar = {
  id: "01a17499-669f-7d02-8645-2801246295bc",
  type: "page-type/movie",
  slug: "jingle-bell-s-christmas-star",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["franchise/jingle-bell-s"],
  position: 2,
  publishedAt: "2012-11-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "150209",
      externalLink: "https://www.themoviedb.org/movie/150209",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Jingle & Bell's Christmas Star",
  genres: ["Animation", "Family", "Drama"],
  imdbId: "tt2306587",
  posterPath: "/cgbHsequNN9nHqoaXwgaWiJgVN8.jpg",
  voteAverage: 5.8,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
  ],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
