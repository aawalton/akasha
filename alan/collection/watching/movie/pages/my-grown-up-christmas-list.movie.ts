import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const myGrownUpChristmasList = {
  id: "01a1749a-464c-7f8f-ab24-1c549482429b",
  type: "page-type/movie",
  slug: "my-grown-up-christmas-list",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2022-07-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "983232",
      externalLink: "https://www.themoviedb.org/movie/983232",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "My Grown-Up Christmas List",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt21058846",
  posterPath: "/liXcawutrsGtQc8CmPYlQadWqGW.jpg",
  voteAverage: 7.317,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
