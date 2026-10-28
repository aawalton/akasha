import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const duke = {
  id: "01a17499-669e-7c3a-a106-74aef5cdef55",
  type: "page-type/movie",
  slug: "duke",
  ownLength: 107,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2012-04-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "252295",
      externalLink: "https://www.themoviedb.org/movie/252295",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Duke",
  genres: ["Crime", "Drama"],
  imdbId: "tt1727254",
  posterPath: "/dP9PvhkRtxTYL0feBpQlB9ZslAv.jpg",
  voteAverage: 5.4,
  streamingOn: [
    "streaming-service/amazon-prime-video",
    "streaming-service/fandango-at-home-free",
    "streaming-service/fubotv",
    "streaming-service/philo",
    "streaming-service/plex",
    "streaming-service/the-roku-channel",
    "streaming-service/tubi",
    "streaming-service/xumo-play",
  ],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
