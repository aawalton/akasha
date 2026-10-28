import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const daterSHandbook = {
  id: "01a17499-a7d4-70ef-9fe2-c2817f452074",
  type: "page-type/movie",
  slug: "dater-s-handbook",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2016-01-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "374614",
      externalLink: "https://www.themoviedb.org/movie/374614",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Dater's Handbook",
  genres: ["Comedy", "Drama", "Romance", "TV Movie"],
  imdbId: "tt5364518",
  posterPath: "/v5useBW3c1ZaxXZWZXD3Nv0k1vi.jpg",
  voteAverage: 5.601,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
    "streaming-service/pluto-tv",
    "streaming-service/vix",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
