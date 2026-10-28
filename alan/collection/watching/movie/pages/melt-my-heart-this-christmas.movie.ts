import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const meltMyHeartThisChristmas = {
  id: "01a1749a-a94b-7bb2-bb30-99446a318354",
  type: "page-type/movie",
  slug: "melt-my-heart-this-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2025-11-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1547917",
      externalLink: "https://www.themoviedb.org/movie/1547917",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Melt My Heart This Christmas",
  genres: ["Romance", "TV Movie", "Comedy"],
  imdbId: "tt37333639",
  posterPath: "/10RrWFTCWL01PG2cDOQBEY0GojR.jpg",
  voteAverage: 5.8,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
