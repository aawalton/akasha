import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const anIcePalaceRomance = {
  id: "01a1749a-89a7-705f-be13-0e55a4466555",
  type: "page-type/movie",
  slug: "an-ice-palace-romance",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2023-12-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1180655",
      externalLink: "https://www.themoviedb.org/movie/1180655",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "An Ice Palace Romance",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt29741889",
  posterPath: "/fmzaPvVgEkhNeObBQfpEpTBvzN7.jpg",
  voteAverage: 6.3,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
