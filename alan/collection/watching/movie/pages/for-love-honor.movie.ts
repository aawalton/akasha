import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const forLoveHonor = {
  id: "01a17499-a7d4-7963-a4c9-04ed2a2a2eac",
  type: "page-type/movie",
  slug: "for-love-honor",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2016-07-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "407173",
      externalLink: "https://www.themoviedb.org/movie/407173",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "For Love & Honor",
  genres: ["Comedy", "Drama", "Romance", "TV Movie"],
  imdbId: "tt5781222",
  posterPath: "/ksKq8scZS9verRaMlaoEsdPyYGI.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
