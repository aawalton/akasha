import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aSummerToRemember = {
  id: "01a17499-c95a-714a-b6b8-73ffff2c5433",
  type: "page-type/movie",
  slug: "a-summer-to-remember",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2018-08-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "531837",
      externalLink: "https://www.themoviedb.org/movie/531837",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Summer to Remember",
  genres: ["TV Movie", "Drama", "Romance", "Comedy"],
  imdbId: "tt8312392",
  posterPath: "/iz9diZVtZGtyRWd8Mu51lDybkiK.jpg",
  voteAverage: 6.4,
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
