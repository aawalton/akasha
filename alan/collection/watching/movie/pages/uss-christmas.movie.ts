import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const ussChristmas = {
  id: "01a1749a-259e-7ebd-ba7f-fef0b6caa867",
  type: "page-type/movie",
  slug: "uss-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2020-11-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "746467",
      externalLink: "https://www.themoviedb.org/movie/746467",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "USS Christmas",
  genres: ["TV Movie", "Mystery"],
  imdbId: "tt13341592",
  posterPath: "/kio6inuU0xXbtacJE5NgPYDedlf.jpg",
  voteAverage: 6.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
