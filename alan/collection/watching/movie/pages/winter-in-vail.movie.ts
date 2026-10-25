import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const winterInVail = {
  id: "01a1749a-06bf-7baa-80c5-fcddf5785906",
  type: "page-type/movie",
  slug: "winter-in-vail",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2020-01-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "656844",
      externalLink: "https://www.themoviedb.org/movie/656844",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Winter in Vail",
  genres: ["TV Movie", "Romance", "Comedy"],
  imdbId: "tt11439610",
  posterPath: "/gMX4Rx0FEN5ooF114mSJIbLsLNZ.jpg",
  voteAverage: 6.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
