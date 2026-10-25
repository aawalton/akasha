import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const seasonSGreetingsFromCherryLane = {
  id: "01a1749a-a94c-7eed-b7d4-3834cad1f90d",
  type: "page-type/movie",
  slug: "season-s-greetings-from-cherry-lane",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2024-12-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1358850",
      externalLink: "https://www.themoviedb.org/movie/1358850",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Season's Greetings from Cherry Lane",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt32559713",
  posterPath: "/wgHObrOlnfvRiR0VhTEC1H5a8uF.jpg",
  voteAverage: 5.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-25T19:47:35.367Z",
} as const satisfies Movie
