import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const hatsOffToLove = {
  id: "01a1749a-a94a-7283-97bb-86145a5e674e",
  type: "page-type/movie",
  slug: "hats-off-to-love",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2025-05-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1458213",
      externalLink: "https://www.themoviedb.org/movie/1458213",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Hats Off to Love",
  genres: ["TV Movie", "Family"],
  imdbId: "tt36414389",
  posterPath: "/eSRIZZI8vMDIAQKVpYDs4Cm7PtV.jpg",
  voteAverage: 5.3,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-25T19:47:35.367Z",
} as const satisfies Movie
