import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const curiousCatererFatalVows = {
  id: "01a1749a-89a7-78da-888a-a06336a0f058",
  type: "page-type/movie",
  slug: "curious-caterer-fatal-vows",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/the-curious-caterer"],
  position: 2,
  publishedAt: "2023-10-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1132282",
      externalLink: "https://www.themoviedb.org/movie/1132282",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Curious Caterer: Fatal Vows",
  genres: ["TV Movie", "Drama", "Mystery"],
  imdbId: "tt27405162",
  posterPath: "/9diQ2QpAwO9lJDtoL6UkOk2sdEZ.jpg",
  voteAverage: 7.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
