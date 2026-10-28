import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aRoyalCorgiChristmas = {
  id: "01a1749a-4648-7a80-94e6-782b685af328",
  type: "page-type/movie",
  slug: "a-royal-corgi-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2022-11-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1028553",
      externalLink: "https://www.themoviedb.org/movie/1028553",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Royal Corgi Christmas",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt21063466",
  posterPath: "/vyodaf69cRhpOMiObnht6FkKpXk.jpg",
  voteAverage: 6.1,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
