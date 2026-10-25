import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aLittleDaytimeDrama = {
  id: "01a1749a-2598-727a-9b28-2c2811591c58",
  type: "page-type/movie",
  slug: "a-little-daytime-drama",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2021-08-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "849277",
      externalLink: "https://www.themoviedb.org/movie/849277",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Little Daytime Drama",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt14833702",
  posterPath: "/nLjWCYBcs8DYlscls7NI437d5Cc.jpg",
  voteAverage: 6.5,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
