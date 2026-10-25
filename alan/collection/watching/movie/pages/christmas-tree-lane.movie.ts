import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasTreeLane = {
  id: "01a1749a-259a-7c88-baf5-9f725350a50d",
  type: "page-type/movie",
  slug: "christmas-tree-lane",
  ownLength: 80,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2020-10-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "737791",
      externalLink: "https://www.themoviedb.org/movie/737791",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas Tree Lane",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt13344860",
  posterPath: "/vs5yakgP0dmgi5WjbyfgkegF0V6.jpg",
  voteAverage: 6.7,
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
