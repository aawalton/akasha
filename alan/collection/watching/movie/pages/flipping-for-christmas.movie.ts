import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const flippingForChristmas = {
  id: "01a1749a-66bd-7c2d-94c5-1a1ab1d79678",
  type: "page-type/movie",
  slug: "flipping-for-christmas",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2023-11-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1180394",
      externalLink: "https://www.themoviedb.org/movie/1180394",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Flipping for Christmas",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt27911907",
  posterPath: "/37yory9m3BTVbR9TwghYBW4weNV.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
