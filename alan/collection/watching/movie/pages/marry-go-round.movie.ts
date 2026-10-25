import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const marryGoRound = {
  id: "01a1749a-464b-76b5-9cfc-c04339679ea5",
  type: "page-type/movie",
  slug: "marry-go-round",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2022-09-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1006305",
      externalLink: "https://www.themoviedb.org/movie/1006305",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Marry Go Round",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt21922002",
  posterPath: "/w6K6XXzl9uzUlGEo3oqab9wejc0.jpg",
  voteAverage: 6.5,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
