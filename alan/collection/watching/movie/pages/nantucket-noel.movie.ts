import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const nantucketNoel = {
  id: "01a1749a-259c-713d-b4ca-670c0e749be7",
  type: "page-type/movie",
  slug: "nantucket-noel",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2021-11-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "874122",
      externalLink: "https://www.themoviedb.org/movie/874122",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Nantucket Noel",
  genres: ["TV Movie", "Comedy", "Romance", "Drama"],
  imdbId: "tt15691228",
  posterPath: "/oBpmDCdW1UehU1EfjGReth7F6tZ.jpg",
  voteAverage: 6.3,
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
