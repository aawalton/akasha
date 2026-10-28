import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const appetiteForLove = {
  id: "01a17499-a7d3-740e-bead-3e2875fc07b6",
  type: "page-type/movie",
  slug: "appetite-for-love",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2016-02-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "377431",
      externalLink: "https://www.themoviedb.org/movie/377431",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Appetite for Love",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt5458812",
  posterPath: "/iijOHt8helVKEaghhoRguu0OtQi.jpg",
  voteAverage: 5.7,
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
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
