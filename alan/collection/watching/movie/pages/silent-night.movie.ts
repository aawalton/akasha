import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const silentNight = {
  id: "01a17497-195d-7ed4-85ec-1366ceaf5f4f",
  type: "page-type/movie",
  slug: "silent-night",
  ownLength: 100,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2002-12-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "17639",
      externalLink: "https://www.themoviedb.org/movie/17639",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Silent_Night_(2002_film)" },
  ],
  title: "Silent Night",
  genres: ["Drama", "War"],
  imdbId: "tt0338434",
  posterPath: "/exN9rOtB1JGBmT6d3R9aylwnHmY.jpg",
  voteAverage: 6.1,
  streamingOn: [
    "streaming-service/amazon-prime-video",
    "streaming-service/amazon-prime-video-free-with-ads",
    "streaming-service/plex",
    "streaming-service/the-roku-channel",
    "streaming-service/tubi",
    "streaming-service/up-faith-and-family",
    "streaming-service/youtube-free",
  ],
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
