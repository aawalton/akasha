import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const timeForMeToComeHomeForChristmas = {
  id: "01a17499-e806-7f4b-85dd-bd9b81385f3d",
  type: "page-type/movie",
  slug: "time-for-me-to-come-home-for-christmas",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2018-12-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "554282",
      externalLink: "https://www.themoviedb.org/movie/554282",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Time for Me to Come Home for Christmas",
  genres: ["Romance", "Drama", "TV Movie"],
  imdbId: "tt9093130",
  posterPath: "/jM6szxRXdVepT3Kw48pDWySlCnM.jpg",
  voteAverage: 6.661,
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
