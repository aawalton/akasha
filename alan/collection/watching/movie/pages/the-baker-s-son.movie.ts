import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theBakerSSon = {
  id: "01a1749a-259e-7df3-b928-cc817c86aa25",
  type: "page-type/movie",
  slug: "the-baker-s-son",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2021-06-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "809338",
      externalLink: "https://www.themoviedb.org/movie/809338",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Baker's Son",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt14757296",
  posterPath: "/wrtQw23W4lzVh2ltcFbJYD3J8CF.jpg",
  voteAverage: 6.3,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
    "streaming-service/pluto-tv",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
