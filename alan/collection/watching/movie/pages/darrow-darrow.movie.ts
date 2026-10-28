import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const darrowDarrow = {
  id: "01a17499-c95b-7373-98ad-1a78a1cb9853",
  type: "page-type/movie",
  slug: "darrow-darrow",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/darrow-darrow"],
  position: 1,
  publishedAt: "2017-10-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "483253",
      externalLink: "https://www.themoviedb.org/movie/483253",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Darrow & Darrow",
  genres: ["Drama", "Mystery", "TV Movie", "Comedy"],
  imdbId: "tt6931984",
  posterPath: "/pK8Aq5A070M0Gr3FUTbpJziF5R5.jpg",
  voteAverage: 7,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
    "streaming-service/youtube-tv",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
