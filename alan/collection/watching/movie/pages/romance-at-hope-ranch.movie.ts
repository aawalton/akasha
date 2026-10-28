import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const romanceAtHopeRanch = {
  id: "01a1749a-c86b-70c0-9b17-1a0a3478b5d2",
  type: "page-type/movie",
  slug: "romance-at-hope-ranch",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2026-02-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1608620",
      externalLink: "https://www.themoviedb.org/movie/1608620",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Romance at Hope Ranch",
  genres: ["Romance", "TV Movie", "Comedy"],
  imdbId: "tt39300788",
  posterPath: "/arwU50Da8nL7xgPQHAwZjV4aQMo.jpg",
  voteAverage: 7,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
    "streaming-service/youtube-tv",
  ],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
