import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const weWishYouAMarriedChristmas = {
  id: "01a1749a-464f-7366-ac9a-4d9cfe6f092b",
  type: "page-type/movie",
  slug: "we-wish-you-a-married-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2022-10-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1027338",
      externalLink: "https://www.themoviedb.org/movie/1027338",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "We Wish You a Married Christmas",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt20876910",
  posterPath: "/cZjDTEpZ0SPER7NuuIIjPlGwEP8.jpg",
  voteAverage: 5.2,
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
