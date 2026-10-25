import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const timeForHimToComeHomeForChristmas = {
  id: "01a1749a-66c1-78f8-8dca-0869aae260b7",
  type: "page-type/movie",
  slug: "time-for-him-to-come-home-for-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2022-11-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1028551",
      externalLink: "https://www.themoviedb.org/movie/1028551",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Time for Him to Come Home for Christmas",
  genres: ["TV Movie", "Comedy", "Drama", "Romance"],
  imdbId: "tt21603520",
  posterPath: "/y7GbjyZbtw77dAXShJIub0vc09F.jpg",
  voteAverage: 6.6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
