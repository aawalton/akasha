import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasClassReunion = {
  id: "01a1749a-464a-710b-8a06-438b33d91ff6",
  type: "page-type/movie",
  slug: "christmas-class-reunion",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2022-12-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1028537",
      externalLink: "https://www.themoviedb.org/movie/1028537",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas Class Reunion",
  genres: ["TV Movie", "Romance", "Comedy"],
  imdbId: "tt18884832",
  posterPath: "/1sYxuse7fhYQ0Zej8Z0tGizD9uu.jpg",
  voteAverage: 5.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
