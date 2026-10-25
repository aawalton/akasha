import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aSplashOfLove = {
  id: "01a1749a-4649-7fb9-ab17-5733aad6a8a6",
  type: "page-type/movie",
  slug: "a-splash-of-love",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2022-07-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "997364",
      externalLink: "https://www.themoviedb.org/movie/997364",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Splash of Love",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt21298582",
  posterPath: "/gaT0dEsbs8Ke1hZL1FyZyTM6mkv.jpg",
  voteAverage: 7.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
