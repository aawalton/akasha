import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const ripInTime = {
  id: "01a1749a-66c0-7910-9c58-7636584c134c",
  type: "page-type/movie",
  slug: "rip-in-time",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2022-05-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "958612",
      externalLink: "https://www.themoviedb.org/movie/958612",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Rip in Time",
  genres: ["TV Movie", "Drama", "Fantasy", "Romance"],
  imdbId: "tt19800814",
  posterPath: "/fgFpbUPC4YH9TUT0Zbji8pNVYXd.jpg",
  voteAverage: 6.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
