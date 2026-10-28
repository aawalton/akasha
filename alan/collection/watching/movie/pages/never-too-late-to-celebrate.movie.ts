import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const neverTooLateToCelebrate = {
  id: "01a1749a-66c0-7f0b-97fd-4775e3c6c7f0",
  type: "page-type/movie",
  slug: "never-too-late-to-celebrate",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2023-08-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1146912",
      externalLink: "https://www.themoviedb.org/movie/1146912",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Never Too Late to Celebrate",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt28477301",
  posterPath: "/rvKQYyz8zBFuHojwURt2rrrXQp2.jpg",
  voteAverage: 7.2,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
