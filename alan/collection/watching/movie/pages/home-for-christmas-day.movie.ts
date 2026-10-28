import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const homeForChristmasDay = {
  id: "01a17499-c95d-79f4-ab0b-56716590a2cd",
  type: "page-type/movie",
  slug: "home-for-christmas-day",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2017-07-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "453217",
      externalLink: "https://www.themoviedb.org/movie/453217",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Home for Christmas Day",
  genres: ["Romance", "Drama", "TV Movie"],
  imdbId: "tt6634632",
  posterPath: "/tD2VlbNVrwzm4aH4bUPUEUQRj8F.jpg",
  voteAverage: 5.9,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
    "streaming-service/pluto-tv",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
