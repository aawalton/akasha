import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const operationNutcracker = {
  id: "01a1749a-a94c-7bd8-bd2b-f08a79f6fbec",
  type: "page-type/movie",
  slug: "operation-nutcracker",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2024-07-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1298476",
      externalLink: "https://www.themoviedb.org/movie/1298476",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Operation Nutcracker",
  genres: ["TV Movie", "Romance", "Comedy"],
  imdbId: "tt30487216",
  posterPath: "/tGBFhErxbevFK6fw1IC8xfsId87.jpg",
  voteAverage: 6.7,
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
