import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const eightGiftsOfHanukkah = {
  id: "01a1749a-259a-7cbb-a95c-f67ab654fb6f",
  type: "page-type/movie",
  slug: "eight-gifts-of-hanukkah",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2021-12-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "888488",
      externalLink: "https://www.themoviedb.org/movie/888488",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Eight Gifts of Hanukkah",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt16282114",
  posterPath: "/zyrviRUaxVMN2rOmmUwMzCFbHG7.jpg",
  voteAverage: 7,
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
