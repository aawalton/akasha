import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveForReal = {
  id: "01a1749a-259b-78e2-8871-debde80fc9c1",
  type: "page-type/movie",
  slug: "love-for-real",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2021-07-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "840377",
      externalLink: "https://www.themoviedb.org/movie/840377",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love, for Real",
  genres: ["TV Movie", "Romance", "Comedy"],
  imdbId: "tt14885506",
  posterPath: "/qsKIjPKoPU750VCpLB8lz2Xk2SR.jpg",
  voteAverage: 6.4,
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
