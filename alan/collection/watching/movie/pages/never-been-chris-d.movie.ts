import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const neverBeenChrisD = {
  id: "01a1749a-66bf-78af-93bd-12f6c3c28ce5",
  type: "page-type/movie",
  slug: "never-been-chris-d",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2023-11-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1180663",
      externalLink: "https://www.themoviedb.org/movie/1180663",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Never Been Chris'd",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt29258217",
  posterPath: "/g1T35Q7w80sH63d5Y6FbREm2hKv.jpg",
  voteAverage: 5.2,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
