import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const senseAndSensibility = {
  id: "01a1749a-89aa-733f-82dc-522115d7bd4c",
  type: "page-type/movie",
  slug: "sense-and-sensibility",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2024-02-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1221680",
      externalLink: "https://www.themoviedb.org/movie/1221680",
      lastSyncedAt: "2026-10-25",
    },
    {
      source: "wikipedia",
      externalLink: "https://en.wikipedia.org/wiki/Sense_and_Sensibility_(2024_film)",
    },
  ],
  title: "Sense and Sensibility",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt31068365",
  posterPath: "/9pGmTVv1S0WQkFeaFaDZKU0zyr8.jpg",
  voteAverage: 4.5,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
