import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const fieldDay = {
  id: "01a1749a-66bd-73f8-9018-92a9b05aed71",
  type: "page-type/movie",
  slug: "field-day",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2023-10-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1132302",
      externalLink: "https://www.themoviedb.org/movie/1132302",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Field Day",
  genres: ["TV Movie", "Comedy", "Romance", "Family"],
  imdbId: "tt23812328",
  posterPath: "/xWLyVulraK9hYrhjGYmLFImMtJ3.jpg",
  voteAverage: 7.4,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
    "streaming-service/youtube-tv",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
