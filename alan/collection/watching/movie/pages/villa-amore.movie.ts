import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const villaAmore = {
  id: "01a1749a-a94e-74a4-950c-4ebd3fe217c1",
  type: "page-type/movie",
  slug: "villa-amore",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2025-06-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1474450",
      externalLink: "https://www.themoviedb.org/movie/1474450",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Villa Amore",
  genres: ["Romance", "Comedy", "TV Movie"],
  imdbId: "tt36777992",
  posterPath: "/xEAMkFdfgfhyLfS27cTW5didwi5.jpg",
  voteAverage: 7.833,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-25T19:47:35.367Z",
} as const satisfies Movie
