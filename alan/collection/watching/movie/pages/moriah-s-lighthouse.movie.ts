import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const moriahSLighthouse = {
  id: "01a1749a-464c-7c31-9c8f-bd711f592574",
  type: "page-type/movie",
  slug: "moriah-s-lighthouse",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2022-06-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "970907",
      externalLink: "https://www.themoviedb.org/movie/970907",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Moriah's Lighthouse",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt19951082",
  posterPath: "/p06fH9y1Y2sPVdJGJ7OCw3HHt28.jpg",
  voteAverage: 6.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
