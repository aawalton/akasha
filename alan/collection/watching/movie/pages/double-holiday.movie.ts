import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const doubleHoliday = {
  id: "01a1749a-06bb-7c56-9dcb-dd98f261c623",
  type: "page-type/movie",
  slug: "double-holiday",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2019-12-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "630913",
      externalLink: "https://www.themoviedb.org/movie/630913",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Double Holiday",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt10768328",
  posterPath: "/ttPyvPt3mRED5EUJTIoRPYzz5N5.jpg",
  voteAverage: 7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
