import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const threeWiseMenAndABaby = {
  id: "01a1749a-464e-7ae4-be34-fe46c7124da7",
  type: "page-type/movie",
  slug: "three-wise-men-and-a-baby",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2022-11-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1028541",
      externalLink: "https://www.themoviedb.org/movie/1028541",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Three Wise Men and a Baby",
  genres: ["TV Movie", "Comedy", "Drama"],
  imdbId: "tt22247482",
  posterPath: "/yR3hrMFIiczybGN7Y8wXMjmnPfz.jpg",
  voteAverage: 7.5,
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
