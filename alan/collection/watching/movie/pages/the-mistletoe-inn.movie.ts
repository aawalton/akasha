import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theMistletoeInn = {
  id: "01a17499-c95f-719b-b464-f8dffc7c709f",
  type: "page-type/movie",
  slug: "the-mistletoe-inn",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/the-mistletoe"],
  position: 2,
  publishedAt: "2017-11-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "475829",
      externalLink: "https://www.themoviedb.org/movie/475829",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Mistletoe Inn",
  genres: ["Drama", "TV Movie", "Romance"],
  imdbId: "tt7647010",
  posterPath: "/AiB08D4fSiM6ZObwVLbGNo5ej9P.jpg",
  voteAverage: 6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T20:45:07.643Z",
} as const satisfies Movie
