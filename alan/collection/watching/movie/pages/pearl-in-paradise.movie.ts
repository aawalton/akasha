import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const pearlInParadise = {
  id: "01a17499-c95e-731a-95f9-5ab5b7d1daca",
  type: "page-type/movie",
  slug: "pearl-in-paradise",
  ownLength: 80,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2018-08-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "531836",
      externalLink: "https://www.themoviedb.org/movie/531836",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Pearl in Paradise",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt8466726",
  posterPath: "/A19g63NzdhCrgk8s8Oa3SVhEQux.jpg",
  voteAverage: 6.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
