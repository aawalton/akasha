import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const allForLove = {
  id: "01a17499-a7d3-72eb-9cab-087ceaaf6fc6",
  type: "page-type/movie",
  slug: "all-for-love",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2017-05-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "456191",
      externalLink: "https://www.themoviedb.org/movie/456191",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "All for Love",
  genres: ["Romance", "TV Movie", "Comedy"],
  imdbId: "tt6948128",
  posterPath: "/w5Bth1WG5Glma0Y2Qli9RCqLX4v.jpg",
  voteAverage: 6.3,
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
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
