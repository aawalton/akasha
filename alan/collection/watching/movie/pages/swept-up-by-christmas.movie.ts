import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const sweptUpByChristmas = {
  id: "01a1749a-259d-7134-8039-718c591c9408",
  type: "page-type/movie",
  slug: "swept-up-by-christmas",
  ownLength: 80,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2020-12-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "746478",
      externalLink: "https://www.themoviedb.org/movie/746478",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Swept Up by Christmas",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt13342118",
  posterPath: "/lOMggLnPGHoDHPEYS8Xr39lTVqb.jpg",
  voteAverage: 5.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
