import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const tradingChristmas = {
  id: "01a17499-66a3-77a2-9cd7-493eedefe7c4",
  type: "page-type/movie",
  slug: "trading-christmas",
  ownLength: 87,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2011-11-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "120055",
      externalLink: "https://www.themoviedb.org/movie/120055",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Trading_Christmas" },
  ],
  title: "Trading Christmas",
  genres: ["TV Movie", "Family"],
  imdbId: "tt2008491",
  posterPath: "/gZZMYde1a9UbJrvF9XxdQA6alGT.jpg",
  voteAverage: 6.6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
