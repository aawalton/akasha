import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theSecretIngredient = {
  id: "01a1749a-06bf-761d-89e0-93862d502832",
  type: "page-type/movie",
  slug: "the-secret-ingredient",
  ownLength: 80,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2020-02-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "661334",
      externalLink: "https://www.themoviedb.org/movie/661334",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Secret Ingredient",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt11421396",
  posterPath: "/loyO1ZVWGQeqSfBGJBsjdYnPvD8.jpg",
  voteAverage: 6.7,
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
