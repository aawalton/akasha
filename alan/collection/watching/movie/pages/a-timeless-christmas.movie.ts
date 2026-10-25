import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aTimelessChristmas = {
  id: "01a1749a-06b9-79b7-b0fa-09f97b9e5e8b",
  type: "page-type/movie",
  slug: "a-timeless-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2020-11-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "746039",
      externalLink: "https://www.themoviedb.org/movie/746039",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Timeless Christmas",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt13341414",
  posterPath: "/AmmlMMpdPCL0ZlHH6qgysnoJ8as.jpg",
  voteAverage: 6.4,
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
