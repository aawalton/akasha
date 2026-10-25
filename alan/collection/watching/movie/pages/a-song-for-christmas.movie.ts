import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aSongForChristmas = {
  id: "01a17499-c95a-77e8-b708-e332ccb38761",
  type: "page-type/movie",
  slug: "a-song-for-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2017-11-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "479613",
      externalLink: "https://www.themoviedb.org/movie/479613",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Song for Christmas",
  genres: ["TV Movie", "Drama", "Romance"],
  imdbId: "tt6759380",
  posterPath: "/4PjXNuqhkrhcMYUJTzsPQmRnXgN.jpg",
  voteAverage: 6.26,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "Tubi TV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
