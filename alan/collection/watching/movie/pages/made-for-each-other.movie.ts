import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const madeForEachOther = {
  id: "01a1749a-66bf-779b-963a-aa7862205de0",
  type: "page-type/movie",
  slug: "made-for-each-other",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2023-02-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1068827",
      externalLink: "https://www.themoviedb.org/movie/1068827",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Made for Each Other",
  genres: ["TV Movie", "Comedy", "Romance", "Fantasy"],
  imdbId: "tt25391120",
  posterPath: "/ifvWdm0KaIg477qTCZrdJrxyZ1E.jpg",
  voteAverage: 6.1,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
