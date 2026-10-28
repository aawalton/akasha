import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const heartsOfWinter = {
  id: "01a1749a-06bc-7a8a-813c-d32494781369",
  type: "page-type/movie",
  slug: "hearts-of-winter",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2020-01-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "656851",
      externalLink: "https://www.themoviedb.org/movie/656851",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Hearts of Winter",
  genres: ["Romance", "Drama", "TV Movie"],
  imdbId: "tt11439618",
  posterPath: "/7sbTpwoG0MtS8OpmOWx0t0GTF7C.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
    "streaming-service/youtube-tv",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
