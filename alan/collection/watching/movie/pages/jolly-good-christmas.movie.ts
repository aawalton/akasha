import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const jollyGoodChristmas = {
  id: "01a1749a-464b-72db-a11e-3f11e74caaa1",
  type: "page-type/movie",
  slug: "jolly-good-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2022-10-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "974213",
      externalLink: "https://www.themoviedb.org/movie/974213",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Jolly Good Christmas",
  genres: ["TV Movie", "Comedy", "Romance", "Drama"],
  imdbId: "tt18077672",
  posterPath: "/26YADsX1ub5IhnYHIMoSAZBeRDR.jpg",
  voteAverage: 6.8,
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
