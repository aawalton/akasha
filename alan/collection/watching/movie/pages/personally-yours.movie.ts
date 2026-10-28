import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const personallyYours = {
  id: "01a17497-195d-7292-9bfa-2b995c6c9c32",
  type: "page-type/movie",
  slug: "personally-yours",
  ownLength: 89,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2000-10-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "143524",
      externalLink: "https://www.themoviedb.org/movie/143524",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Personally Yours",
  genres: ["Drama", "Romance"],
  imdbId: "tt0262682",
  posterPath: "/dh81DF1RJFDZIqNVxTIuZ8yOrqx.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "streaming-service/amazon-prime-video",
    "streaming-service/cineverse",
    "streaming-service/dove",
    "streaming-service/plex",
    "streaming-service/pluto-tv",
    "streaming-service/the-cw",
    "streaming-service/the-roku-channel",
    "streaming-service/tubi",
  ],
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
