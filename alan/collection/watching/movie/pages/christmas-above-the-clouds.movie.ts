import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasAboveTheClouds = {
  id: "01a1749a-a949-707e-8d7e-a195e96860ad",
  type: "page-type/movie",
  slug: "christmas-above-the-clouds",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2025-11-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1537081",
      externalLink: "https://www.themoviedb.org/movie/1537081",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas Above the Clouds",
  genres: ["Romance", "Comedy", "TV Movie", "Fantasy"],
  imdbId: "tt38183872",
  posterPath: "/sMHF7beWXqWzXqtclqrz6vd95xV.jpg",
  voteAverage: 7.2,
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
