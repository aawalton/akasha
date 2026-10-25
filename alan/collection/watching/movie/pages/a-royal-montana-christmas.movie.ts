import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aRoyalMontanaChristmas = {
  id: "01a1749a-a948-7e4d-914a-ed671c66bd03",
  type: "page-type/movie",
  slug: "a-royal-montana-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2025-10-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1535223",
      externalLink: "https://www.themoviedb.org/movie/1535223",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Royal Montana Christmas",
  genres: ["Romance", "TV Movie", "Comedy", "Drama"],
  imdbId: "tt36364046",
  posterPath: "/uZAlg4qaZONhLcco7n8hFzWLBsU.jpg",
  voteAverage: 7.6,
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
