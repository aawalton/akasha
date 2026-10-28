import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const trueLoveBlooms = {
  id: "01a17499-e806-7465-ab0c-e78f9eac51b5",
  type: "page-type/movie",
  slug: "true-love-blooms",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2019-04-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "583727",
      externalLink: "https://www.themoviedb.org/movie/583727",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "True Love Blooms",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt9759938",
  posterPath: "/kesL2ioCEGNNLahaZhTJkWWxDFf.jpg",
  voteAverage: 6.5,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
    "streaming-service/plex",
    "streaming-service/the-roku-channel",
    "streaming-service/tubi",
    "streaming-service/youtube-free",
    "streaming-service/youtube-tv",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
