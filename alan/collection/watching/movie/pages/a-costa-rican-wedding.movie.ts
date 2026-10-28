import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aCostaRicanWedding = {
  id: "01a1749a-89a6-72c1-a475-e7d07baef269",
  type: "page-type/movie",
  slug: "a-costa-rican-wedding",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2024-08-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1310505",
      externalLink: "https://www.themoviedb.org/movie/1310505",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Costa Rican Wedding",
  genres: ["Romance", "Adventure", "Comedy"],
  imdbId: "tt32820804",
  posterPath: "/ccYPtLstIoNW1zkWzOQg2MC0qs3.jpg",
  voteAverage: 6.583,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
