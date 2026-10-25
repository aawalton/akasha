import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aDickensOfAHoliday = {
  id: "01a1749a-2598-7b4d-9a4a-cc52d6ee6000",
  type: "page-type/movie",
  slug: "a-dickens-of-a-holiday",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2021-12-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "877828",
      externalLink: "https://www.themoviedb.org/movie/877828",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Dickens of a Holiday!",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt15235708",
  posterPath: "/rqm52nuyi19lxFEHz4DCVsCmA6v.jpg",
  voteAverage: 6.828,
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
