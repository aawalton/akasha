import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theWeddingDress = {
  id: "01a17497-195e-7840-bbba-3cb98016f0af",
  type: "page-type/movie",
  slug: "the-wedding-dress",
  ownLength: 95,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2001-10-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "97276",
      externalLink: "https://www.themoviedb.org/movie/97276",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Wedding Dress",
  genres: ["Drama", "Romance", "TV Movie"],
  imdbId: "tt0290104",
  posterPath: "/yMxFCilRW6HhWi9GA0k10oEa8kN.jpg",
  voteAverage: 5.6,
  streamingOn: [
    "streaming-service/amazon-prime-video",
    "streaming-service/shout-factory-tv",
    "streaming-service/the-cw",
    "streaming-service/the-roku-channel",
    "streaming-service/tubi",
    "streaming-service/xumo-play",
  ],
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
