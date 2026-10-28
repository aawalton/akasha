import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const whenCallsTheHeart = {
  id: "01a17499-66a3-75e7-a781-cfdda8252767",
  type: "page-type/movie",
  slug: "when-calls-the-heart",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["franchise/when-calls-the-heart"],
  position: 1,
  publishedAt: "2013-10-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "229749",
      externalLink: "https://www.themoviedb.org/movie/229749",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "When Calls the Heart",
  genres: ["Drama", "Romance", "Comedy", "TV Movie"],
  imdbId: "tt2362991",
  posterPath: "/jKQKlEwii03hzgsxHPpiG01vkiZ.jpg",
  voteAverage: 6.6,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
    "streaming-service/the-roku-channel",
    "streaming-service/tubi",
    "streaming-service/xumo-play",
  ],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
