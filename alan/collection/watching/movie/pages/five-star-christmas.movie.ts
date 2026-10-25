import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const fiveStarChristmas = {
  id: "01a1749a-06bc-78e9-b0ef-ec0288b5081b",
  type: "page-type/movie",
  slug: "five-star-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2020-11-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "746060",
      externalLink: "https://www.themoviedb.org/movie/746060",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Five Star Christmas",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt13320784",
  posterPath: "/2YE5vNC4ClIXRWBvWEahul6jPOy.jpg",
  voteAverage: 6.9,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
