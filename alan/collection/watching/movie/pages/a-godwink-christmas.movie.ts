import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aGodwinkChristmas = {
  id: "01a17499-e800-754e-9ce7-e07ca1a82ad9",
  type: "page-type/movie",
  slug: "a-godwink-christmas",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["franchise/a-godwink-christmas"],
  position: 1,
  publishedAt: "2018-11-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "549313",
      externalLink: "https://www.themoviedb.org/movie/549313",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Godwink Christmas",
  genres: ["TV Movie", "Family", "Romance"],
  imdbId: "tt8974850",
  posterPath: "/j9Nor1fZI2DLrlCKhEUVLqa9MfO.jpg",
  voteAverage: 6.3,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T20:45:10.655Z",
} as const satisfies Movie
