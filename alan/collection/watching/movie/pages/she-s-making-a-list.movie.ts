import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const sheSMakingAList = {
  id: "01a1749a-a94c-7760-bd79-6cb4831452a0",
  type: "page-type/movie",
  slug: "she-s-making-a-list",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2025-12-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1516208",
      externalLink: "https://www.themoviedb.org/movie/1516208",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "She's Making a List",
  genres: ["Romance", "Comedy", "TV Movie"],
  imdbId: "tt38354965",
  posterPath: "/rpqNhO6PtTrBsuEh10O3rAVWDg1.jpg",
  voteAverage: 6.7,
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
