import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const unlockingChristmas = {
  id: "01a1749a-259e-7948-8384-f0b5c8237835",
  type: "page-type/movie",
  slug: "unlocking-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2020-12-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "746476",
      externalLink: "https://www.themoviedb.org/movie/746476",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Unlocking Christmas",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt13246926",
  posterPath: "/gFhoJx9JJBea5ADYqCAC1WkMBlD.jpg",
  voteAverage: 6.9,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
