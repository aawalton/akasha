import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aPinchOfPortugal = {
  id: "01a1749a-66bb-7b42-ad6d-c063e8d14b11",
  type: "page-type/movie",
  slug: "a-pinch-of-portugal",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2023-04-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1093765",
      externalLink: "https://www.themoviedb.org/movie/1093765",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Pinch of Portugal",
  genres: ["TV Movie", "Romance", "Comedy"],
  imdbId: "tt27244707",
  posterPath: "/kezARoHkqxe9rwooYs2od1GgdOf.jpg",
  voteAverage: 5.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
