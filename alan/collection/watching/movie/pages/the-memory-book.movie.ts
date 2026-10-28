import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theMemoryBook = {
  id: "01a17499-8949-77ca-8f15-b46ded7d2192",
  type: "page-type/movie",
  slug: "the-memory-book",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2014-07-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "288899",
      externalLink: "https://www.themoviedb.org/movie/288899",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Memory Book",
  genres: ["TV Movie", "Romance", "Drama"],
  imdbId: "tt3593926",
  posterPath: "/skuMO29zxv86vIpP7OTdroDa8oy.jpg",
  voteAverage: 6.4,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
    "streaming-service/plex",
    "streaming-service/the-roku-channel",
    "streaming-service/tubi",
    "streaming-service/youtube-free",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
