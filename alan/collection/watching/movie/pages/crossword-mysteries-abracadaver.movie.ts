import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const crosswordMysteriesAbracadaver = {
  id: "01a1749a-259a-7b4f-9e50-8b3579578bea",
  type: "page-type/movie",
  slug: "crossword-mysteries-abracadaver",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["franchise/crossword-mysteries"],
  position: 3,
  publishedAt: "2020-01-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "639289",
      externalLink: "https://www.themoviedb.org/movie/639289",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Crossword Mysteries: Abracadaver",
  genres: ["TV Movie", "Mystery", "Crime"],
  imdbId: "tt9759894",
  posterPath: "/rkFB81pZF0iJLxM0Hd4LzOXcIaO.jpg",
  voteAverage: 7.96,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T20:45:13.587Z",
} as const satisfies Movie
