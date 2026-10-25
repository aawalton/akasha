import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aValentineSMatch = {
  id: "01a1749a-06b9-7b36-b0d0-50009ff2bfea",
  type: "page-type/movie",
  slug: "a-valentine-s-match",
  ownLength: 80,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2020-02-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "661331",
      externalLink: "https://www.themoviedb.org/movie/661331",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Valentine's Match",
  genres: ["Romance", "Drama", "TV Movie"],
  imdbId: "tt11274306",
  posterPath: "/oFt5aETu3TnANmS7N6zmZgJL8hh.jpg",
  voteAverage: 7,
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
