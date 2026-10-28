import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const alongCameANanny = {
  id: "01a17499-8943-7229-9c13-d3ed72da12a6",
  type: "page-type/movie",
  slug: "along-came-a-nanny",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2014-10-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "295656",
      externalLink: "https://www.themoviedb.org/movie/295656",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Along Came a Nanny",
  genres: ["Mystery", "TV Movie"],
  imdbId: "tt3958180",
  posterPath: "/pwaUvfkURWHlHlJnZkJZoE6k4Sl.jpg",
  voteAverage: 6.1,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
    "streaming-service/plex",
    "streaming-service/tubi",
    "streaming-service/youtube-free",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
