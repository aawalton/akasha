import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theLoveClubSydneySJourney = {
  id: "01a1749a-89ab-7916-a281-e133d7d24558",
  type: "page-type/movie",
  slug: "the-love-club-sydney-s-journey",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["franchise/the-love-club"],
  position: 2,
  publishedAt: "2023-02-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1084024",
      externalLink: "https://www.themoviedb.org/movie/1084024",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Love Club: Sydney's Journey",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt20857660",
  posterPath: "/j3oyNklUi0Yjv7UeOyGQTMzAbVQ.jpg",
  voteAverage: 7.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T20:45:25.537Z",
} as const satisfies Movie
