import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const thePerfectPairing = {
  id: "01a1749a-464e-7593-a4db-15324e7445e8",
  type: "page-type/movie",
  slug: "the-perfect-pairing",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2022-01-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "874136",
      externalLink: "https://www.themoviedb.org/movie/874136",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Perfect Pairing",
  genres: ["TV Movie", "Romance", "Comedy"],
  imdbId: "tt14459724",
  posterPath: "/fEEJzb0Vtb9xI6Q17ob7uHrDiZK.jpg",
  voteAverage: 6.1,
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
