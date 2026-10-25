import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const makingSpiritsBright = {
  id: "01a1749a-259b-703b-92de-e81a55782928",
  type: "page-type/movie",
  slug: "making-spirits-bright",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2021-11-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "874140",
      externalLink: "https://www.themoviedb.org/movie/874140",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Making Spirits Bright",
  genres: ["TV Movie", "Drama", "Romance"],
  imdbId: "tt15102772",
  posterPath: "/AfOmrNotL9XeDU2NzgeqmvKl2NE.jpg",
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
