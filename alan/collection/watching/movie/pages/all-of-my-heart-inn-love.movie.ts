import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const allOfMyHeartInnLove = {
  id: "01a17499-c95a-7b42-8222-c19fe0e3ee3f",
  type: "page-type/movie",
  slug: "all-of-my-heart-inn-love",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/all-of-my-heart"],
  position: 1,
  publishedAt: "2017-10-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "478210",
      externalLink: "https://www.themoviedb.org/movie/478210",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "All of My Heart: Inn Love",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt7243076",
  posterPath: "/wrAH2x1qPKXzCyBV0gV3sRSvN8I.jpg",
  voteAverage: 6.818,
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
