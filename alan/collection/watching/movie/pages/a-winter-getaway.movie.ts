import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aWinterGetaway = {
  id: "01a1749a-2598-7225-9d28-e6bc865cce2c",
  type: "page-type/movie",
  slug: "a-winter-getaway",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2021-01-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "775619",
      externalLink: "https://www.themoviedb.org/movie/775619",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Winter Getaway",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt13606142",
  posterPath: "/a2r1AFLFkQWqmlMk415xPUGkJGl.jpg",
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
