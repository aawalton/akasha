import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const journeyBackToChristmas = {
  id: "01a17499-a7d5-72f7-bb32-bd2cf49ceaf8",
  type: "page-type/movie",
  slug: "journey-back-to-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2016-11-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "421758",
      externalLink: "https://www.themoviedb.org/movie/421758",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Journey Back to Christmas",
  genres: ["Drama", "Family", "TV Movie"],
  imdbId: "tt6269192",
  posterPath: "/5N6QVpPHkNhc1ba6HAaNRwi8B2M.jpg",
  voteAverage: 6.5,
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
