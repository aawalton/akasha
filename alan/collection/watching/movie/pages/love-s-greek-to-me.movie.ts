import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveSGreekToMe = {
  id: "01a1749a-66bf-7338-8bd8-93e7776f451a",
  type: "page-type/movie",
  slug: "love-s-greek-to-me",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2023-06-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1119749",
      externalLink: "https://www.themoviedb.org/movie/1119749",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love's Greek to Me",
  genres: ["TV Movie", "Romance", "Comedy"],
  imdbId: "tt27689644",
  posterPath: "/sHYBZ7V5KCudH0XbbYWpbt8uZKU.jpg",
  voteAverage: 6,
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
