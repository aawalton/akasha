import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const anUncommonGrace = {
  id: "01a17499-c95a-75d3-8810-17abd390e06a",
  type: "page-type/movie",
  slug: "an-uncommon-grace",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2017-02-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "437517",
      externalLink: "https://www.themoviedb.org/movie/437517",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "An Uncommon Grace",
  genres: ["Drama", "Romance", "TV Movie"],
  imdbId: "tt6173488",
  posterPath: "/ju55r2YeVlz0rUKWYUzl0LW8d1N.jpg",
  voteAverage: 6.5,
  streamingOn: [
    "streaming-service/fandango-at-home-free",
    "streaming-service/filmzie",
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
    "streaming-service/plex",
    "streaming-service/youtube-tv",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
