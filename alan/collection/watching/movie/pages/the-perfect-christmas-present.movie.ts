import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const thePerfectChristmasPresent = {
  id: "01a17499-c95f-76fe-88c0-17e02c1a052d",
  type: "page-type/movie",
  slug: "the-perfect-christmas-present",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2017-11-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "480638",
      externalLink: "https://www.themoviedb.org/movie/480638",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Perfect Christmas Present",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt6398464",
  posterPath: "/4bn7xVSndMAO2TMZrSeY61dT7Bb.jpg",
  voteAverage: 6.2,
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
