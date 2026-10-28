import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveOnIce = {
  id: "01a17499-a7d6-71d7-bcbe-dccb8ae9408f",
  type: "page-type/movie",
  slug: "love-on-ice",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2017-01-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "433677",
      externalLink: "https://www.themoviedb.org/movie/433677",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love on Ice",
  genres: ["Romance", "Drama", "TV Movie"],
  imdbId: "tt6319714",
  posterPath: "/lgJmMMxftJVkt94IJXuqbHkNj5r.jpg",
  voteAverage: 6.305,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
    "streaming-service/plex",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
