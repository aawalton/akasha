import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const fiveMoreMinutesMomentsLikeThese = {
  id: "01a1749a-66bd-75f5-8f72-00fb764de38b",
  type: "page-type/movie",
  slug: "five-more-minutes-moments-like-these",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/five-more-minutes"],
  position: 2,
  publishedAt: "2022-12-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1028538",
      externalLink: "https://www.themoviedb.org/movie/1028538",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Five More Minutes: Moments Like These",
  genres: ["TV Movie", "Comedy", "Drama", "Romance"],
  imdbId: "tt22309036",
  posterPath: "/aNUHuT3aHfaZq3D64J88OneMszI.jpg",
  voteAverage: 5.9,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T20:45:22.183Z",
} as const satisfies Movie
