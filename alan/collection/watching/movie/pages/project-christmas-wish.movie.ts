import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const projectChristmasWish = {
  id: "01a1749a-259c-776f-9b63-400082c00f75",
  type: "page-type/movie",
  slug: "project-christmas-wish",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2020-12-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "746480",
      externalLink: "https://www.themoviedb.org/movie/746480",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Project Christmas Wish",
  genres: ["TV Movie", "Romance", "Family"],
  imdbId: "tt13342238",
  posterPath: "/3rrVRvULO7Hx4bHIinhfcbRYhzW.jpg",
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
