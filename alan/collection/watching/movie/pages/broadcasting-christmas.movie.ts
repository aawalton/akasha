import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const broadcastingChristmas = {
  id: "01a17499-a7d3-7d0b-881a-81da0dbcd0e6",
  type: "page-type/movie",
  slug: "broadcasting-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2016-11-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "421759",
      externalLink: "https://www.themoviedb.org/movie/421759",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Broadcasting Christmas",
  genres: ["TV Movie", "Romance", "Drama", "Comedy"],
  imdbId: "tt6167116",
  posterPath: "/c8VrxCL42EejLOWbzSfkLoLix5Q.jpg",
  voteAverage: 5.7,
  streamingOn: [
    "streaming-service/amazon-mx-player",
    "streaming-service/amazon-prime-video",
    "streaming-service/amazon-prime-video-free-with-ads",
    "streaming-service/the-roku-channel",
    "streaming-service/tubi",
    "streaming-service/xumo-play",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
