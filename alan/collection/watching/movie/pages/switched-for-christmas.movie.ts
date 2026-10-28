import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const switchedForChristmas = {
  id: "01a17499-c95f-7936-b4ef-037973632adc",
  type: "page-type/movie",
  slug: "switched-for-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2017-11-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "475830",
      externalLink: "https://www.themoviedb.org/movie/475830",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Switched for Christmas",
  genres: ["TV Movie", "Drama"],
  imdbId: "tt7038606",
  posterPath: "/tu6fM4b9izPZU3EQc1bOvx3rmZc.jpg",
  voteAverage: 6.495,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
    "streaming-service/pluto-tv",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
