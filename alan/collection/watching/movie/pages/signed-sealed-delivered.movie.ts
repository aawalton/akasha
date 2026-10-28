import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const signedSealedDelivered = {
  id: "01a17499-66a1-7ad1-af7f-c2b56c83bd65",
  type: "page-type/movie",
  slug: "signed-sealed-delivered",
  ownLength: 87,
  ownProgress: 0,
  partOfCollections: ["franchise/signed-sealed-delivered"],
  position: 1,
  publishedAt: "2013-10-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "231617",
      externalLink: "https://www.themoviedb.org/movie/231617",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Signed, Sealed, Delivered",
  genres: ["Comedy", "Drama", "Romance", "TV Movie"],
  imdbId: "tt3000844",
  posterPath: "/6BVCgmhLeSTF8nPBuE9ncHHcCNv.jpg",
  voteAverage: 6.7,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
    "streaming-service/plex",
    "streaming-service/the-roku-channel",
    "streaming-service/tubi",
    "streaming-service/youtube-free",
  ],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
