import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveOnTheAir = {
  id: "01a17499-8946-7bca-97d3-7e9af6aeece8",
  type: "page-type/movie",
  slug: "love-on-the-air",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2015-09-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "352851",
      externalLink: "https://www.themoviedb.org/movie/352851",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love on the Air",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt4539828",
  posterPath: "/uIGoakOBipOe5Glht3dxIvmaZvY.jpg",
  voteAverage: 6.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
