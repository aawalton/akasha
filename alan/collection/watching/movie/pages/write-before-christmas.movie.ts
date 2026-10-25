import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const writeBeforeChristmas = {
  id: "01a17499-e807-70ff-9591-36f6485d54bf",
  type: "page-type/movie",
  slug: "write-before-christmas",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2019-11-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "626319",
      externalLink: "https://www.themoviedb.org/movie/626319",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Write Before Christmas",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt10345008",
  posterPath: "/jiC9CTgWVi9ytFrP01PtfvBamuK.jpg",
  voteAverage: 6.863,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
