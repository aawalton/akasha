import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const valentineEverAfter = {
  id: "01a17499-a7d8-7ae8-b6dd-4b670dab4c3b",
  type: "page-type/movie",
  slug: "valentine-ever-after",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2016-02-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "377432",
      externalLink: "https://www.themoviedb.org/movie/377432",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Valentine Ever After",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt3515524",
  posterPath: "/zyRNgxw4pIeP5qGk1Cllcj8h2pE.jpg",
  voteAverage: 6.3,
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
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
