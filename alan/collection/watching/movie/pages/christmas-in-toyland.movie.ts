import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasInToyland = {
  id: "01a1749a-464a-73d0-97af-4ff1a3d9913f",
  type: "page-type/movie",
  slug: "christmas-in-toyland",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2022-07-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "874237",
      externalLink: "https://www.themoviedb.org/movie/874237",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas in Toyland",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt15891306",
  posterPath: "/mGL5PoGJgCMBC15PV2b58XvtoQV.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
