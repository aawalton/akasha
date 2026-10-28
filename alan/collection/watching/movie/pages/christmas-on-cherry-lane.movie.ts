import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasOnCherryLane = {
  id: "01a1749a-66bc-7ff7-83b5-92b0c0d19d48",
  type: "page-type/movie",
  slug: "christmas-on-cherry-lane",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2023-12-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1180665",
      externalLink: "https://www.themoviedb.org/movie/1180665",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas on Cherry Lane",
  genres: ["TV Movie", "Comedy", "Romance", "Drama"],
  imdbId: "tt28287106",
  posterPath: "/ggZsX97GTu47mhQ7jz04gAFcxAG.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
