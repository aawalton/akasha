import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const iLlBeHomeForChristmas = {
  id: "01a17499-a7d5-77b5-972b-eee895b6c747",
  type: "page-type/movie",
  slug: "i-ll-be-home-for-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2016-11-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "421632",
      externalLink: "https://www.themoviedb.org/movie/421632",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "I'll Be Home for Christmas",
  genres: ["TV Movie", "Family", "Drama"],
  imdbId: "tt5860940",
  posterPath: "/jecVCKLA2rttDps4jiFdtd0pA3n.jpg",
  voteAverage: 6.1,
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
