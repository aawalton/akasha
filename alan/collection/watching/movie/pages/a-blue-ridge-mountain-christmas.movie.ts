import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aBlueRidgeMountainChristmas = {
  id: "01a1749a-06b8-7cb1-a1aa-12e76f24cb56",
  type: "page-type/movie",
  slug: "a-blue-ridge-mountain-christmas",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2019-11-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "630898",
      externalLink: "https://www.themoviedb.org/movie/630898",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Blue Ridge Mountain Christmas",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt10936658",
  posterPath: "/wyUxSIQdtyuEtE85KoFzYHffFNn.jpg",
  voteAverage: 6.304,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
