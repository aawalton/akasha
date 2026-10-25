import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const amazingWinterRomance = {
  id: "01a1749a-06b9-7a35-abf9-44fdcfec0936",
  type: "page-type/movie",
  slug: "amazing-winter-romance",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2020-01-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "656850",
      externalLink: "https://www.themoviedb.org/movie/656850",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Amazing Winter Romance",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt10297640",
  posterPath: "/6WCT88z4TZOK1JXjXHc6jSORLVd.jpg",
  voteAverage: 6.2,
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
