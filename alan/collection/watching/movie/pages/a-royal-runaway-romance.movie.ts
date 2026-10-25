import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aRoyalRunawayRomance = {
  id: "01a1749a-4649-76e7-afc8-1fca75896d2d",
  type: "page-type/movie",
  slug: "a-royal-runaway-romance",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2022-04-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "944946",
      externalLink: "https://www.themoviedb.org/movie/944946",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Royal Runaway Romance",
  genres: ["TV Movie", "Comedy", "Romance", "Drama"],
  imdbId: "tt18554942",
  posterPath: "/78YbxVTXFwZ08kfqHb6abWF1WBY.jpg",
  voteAverage: 7.259,
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
