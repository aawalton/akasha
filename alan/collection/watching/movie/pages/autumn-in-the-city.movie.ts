import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const autumnInTheCity = {
  id: "01a1749a-4649-74fa-aced-0d5e0767f6f2",
  type: "page-type/movie",
  slug: "autumn-in-the-city",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2022-10-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1020489",
      externalLink: "https://www.themoviedb.org/movie/1020489",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Autumn in the City",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt21256406",
  posterPath: "/xSVaamZtuDR4jgW4or9JUQ0qgQ7.jpg",
  voteAverage: 5.543,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
