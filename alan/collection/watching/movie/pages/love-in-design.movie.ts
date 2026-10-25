import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveInDesign = {
  id: "01a17499-c95d-7176-8cd9-acef3a3b15e9",
  type: "page-type/movie",
  slug: "love-in-design",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2018-09-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "535805",
      externalLink: "https://www.themoviedb.org/movie/535805",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love in Design",
  genres: ["Romance", "TV Movie", "Comedy"],
  imdbId: "tt8555248",
  posterPath: "/vuuyqGwSAcjfJsVzJTTt0AQXxMl.jpg",
  voteAverage: 6.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
