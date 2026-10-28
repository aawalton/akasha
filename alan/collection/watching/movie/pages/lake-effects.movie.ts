import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const lakeEffects = {
  id: "01a17499-669f-7214-9770-5fda9e29623f",
  type: "page-type/movie",
  slug: "lake-effects",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2012-05-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "127061",
      externalLink: "https://www.themoviedb.org/movie/127061",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Lake Effects",
  genres: ["Drama", "Family", "Comedy", "Romance", "TV Movie"],
  imdbId: "tt1699498",
  posterPath: "/bjw6ray53H3rhBasCUm9YzUsV0T.jpg",
  voteAverage: 4.1,
  streamingOn: [
    "streaming-service/amazon-mx-player",
    "streaming-service/amazon-prime-video",
    "streaming-service/amazon-prime-video-free-with-ads",
    "streaming-service/cineverse",
    "streaming-service/dove",
    "streaming-service/plex",
    "streaming-service/pluto-tv",
    "streaming-service/the-roku-channel",
    "streaming-service/tubi",
  ],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
