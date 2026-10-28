import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const roadToChristmas = {
  id: "01a17499-c95e-75a4-9987-df99827e9dc5",
  type: "page-type/movie",
  slug: "road-to-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2018-11-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "550017",
      externalLink: "https://www.themoviedb.org/movie/550017",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Road to Christmas",
  genres: ["Family", "Romance", "TV Movie"],
  imdbId: "tt8732914",
  posterPath: "/7F46Dl9oHsVjdCxQtNReXrD4PUq.jpg",
  voteAverage: 6.274,
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
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
