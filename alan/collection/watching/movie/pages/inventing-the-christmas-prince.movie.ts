import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const inventingTheChristmasPrince = {
  id: "01a1749a-464b-7a78-8c78-e545215c0a9f",
  type: "page-type/movie",
  slug: "inventing-the-christmas-prince",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2022-11-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1028223",
      externalLink: "https://www.themoviedb.org/movie/1028223",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Inventing the Christmas Prince",
  genres: ["TV Movie", "Comedy", "Drama", "Romance"],
  imdbId: "tt20892688",
  posterPath: "/puabcXiqEBRKJPJMaiVgAF8Vsy5.jpg",
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
