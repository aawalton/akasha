import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theRoyalWe = {
  id: "01a1749a-a94d-7753-9bc0-bf62ca214d95",
  type: "page-type/movie",
  slug: "the-royal-we",
  ownLength: 86,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2025-03-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1418286",
      externalLink: "https://www.themoviedb.org/movie/1418286",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Royal We",
  genres: ["Romance", "Comedy"],
  imdbId: "tt35558973",
  posterPath: "/rNdqi9oYpynE7pDMF9vysCedFzg.jpg",
  voteAverage: 6.447,
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
