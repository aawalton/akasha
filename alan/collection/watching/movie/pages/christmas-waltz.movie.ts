import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasWaltz = {
  id: "01a1749a-06bb-77c2-a5a3-e7396e10ba6f",
  type: "page-type/movie",
  slug: "christmas-waltz",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2020-11-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "733032",
      externalLink: "https://www.themoviedb.org/movie/733032",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas Waltz",
  genres: ["TV Movie", "Romance", "Drama"],
  imdbId: "tt11585200",
  posterPath: "/6YewfKDTQmzVwwBKog6IWOLhENP.jpg",
  voteAverage: 6.9,
  streamingOn: ["Hallmark TV Amazon Channel", "Philo", "fuboTV"],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
