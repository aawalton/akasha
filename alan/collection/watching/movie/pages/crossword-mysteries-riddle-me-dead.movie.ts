import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const crosswordMysteriesRiddleMeDead = {
  id: "01a1749a-464a-7b3e-bda0-c227c32be256",
  type: "page-type/movie",
  slug: "crossword-mysteries-riddle-me-dead",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["franchise/crossword-mysteries"],
  position: 4,
  publishedAt: "2021-04-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "784410",
      externalLink: "https://www.themoviedb.org/movie/784410",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Crossword Mysteries: Riddle Me Dead",
  genres: ["TV Movie", "Mystery", "Crime", "Drama"],
  imdbId: "tt11686354",
  posterPath: "/7AC6r7wgq8gToysiVSZYlRnB4Rs.jpg",
  voteAverage: 7.589,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
