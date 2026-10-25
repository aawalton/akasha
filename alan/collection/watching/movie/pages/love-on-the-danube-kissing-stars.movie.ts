import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveOnTheDanubeKissingStars = {
  id: "01a1749a-a94b-79c8-a207-1538574578ef",
  type: "page-type/movie",
  slug: "love-on-the-danube-kissing-stars",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/love-on-the-danube"],
  position: 2,
  publishedAt: "2024-09-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1329921",
      externalLink: "https://www.themoviedb.org/movie/1329921",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love on the Danube: Kissing Stars",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt33113326",
  posterPath: "/pyeArDj6KnTPuAFOwqezhhXGRaQ.jpg",
  voteAverage: 7.4,
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
