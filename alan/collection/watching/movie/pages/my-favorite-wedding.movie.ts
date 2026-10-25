import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const myFavoriteWedding = {
  id: "01a17499-a7d6-79c4-945b-c65050d70608",
  type: "page-type/movie",
  slug: "my-favorite-wedding",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2017-06-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "463252",
      externalLink: "https://www.themoviedb.org/movie/463252",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "My Favorite Wedding",
  genres: ["Comedy", "Romance", "TV Movie"],
  imdbId: "tt6928060",
  posterPath: "/tnrjUwRVzKriT3dKHRVQutfzYH3.jpg",
  voteAverage: 6.882,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
