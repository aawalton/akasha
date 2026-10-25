import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const inTheKeyOfLove = {
  id: "01a1749a-06bc-75f3-ac17-29a10240782f",
  type: "page-type/movie",
  slug: "in-the-key-of-love",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2020-03-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "603453",
      externalLink: "https://www.themoviedb.org/movie/603453",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "In the Key of Love",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt10136908",
  posterPath: "/9WjmAXdXJz0csm0sTJPTJpECSjP.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
