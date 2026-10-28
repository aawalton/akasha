import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const iLlBeSeeingYou = {
  id: "01a1749a-c869-7dac-81d7-b1baf1e909bd",
  type: "page-type/movie",
  slug: "i-ll-be-seeing-you",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2026-04-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1645579",
      externalLink: "https://www.themoviedb.org/movie/1645579",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "I'll Be Seeing You",
  genres: ["Romance"],
  imdbId: "tt38058112",
  posterPath: "/bJ9BfopBu8ozKqmQeW7wAOc2fCF.jpg",
  voteAverage: 7.1,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
