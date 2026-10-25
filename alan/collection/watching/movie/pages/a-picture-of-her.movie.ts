import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aPictureOfHer = {
  id: "01a1749a-66bb-7a67-b3b4-ace43735ff78",
  type: "page-type/movie",
  slug: "a-picture-of-her",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2023-03-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1081439",
      externalLink: "https://www.themoviedb.org/movie/1081439",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Picture of Her",
  genres: ["TV Movie", "Romance", "Drama"],
  imdbId: "tt26593219",
  posterPath: "/iviFpnmCu0qs6VzH9H0WlhX4aja.jpg",
  voteAverage: 6.968,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
