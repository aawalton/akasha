import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const midwayToLove = {
  id: "01a1749a-259b-759c-baea-317cd479ca7f",
  type: "page-type/movie",
  slug: "midway-to-love",
  ownLength: 87,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2020-06-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "609434",
      externalLink: "https://www.themoviedb.org/movie/609434",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Midway to Love",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt8954890",
  posterPath: "/tvLI9q2TJfa6GZT8RiCcQ0b7ryl.jpg",
  voteAverage: 6.1,
  streamingOn: [
    "streaming-service/amazon-mx-player",
    "streaming-service/amazon-prime-video",
    "streaming-service/amazon-prime-video-free-with-ads",
    "streaming-service/plex",
    "streaming-service/runtime",
    "streaming-service/the-roku-channel",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
