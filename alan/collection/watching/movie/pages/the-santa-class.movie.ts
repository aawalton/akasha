import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theSantaClass = {
  id: "01a1749a-a94d-7687-9790-d85f1aac8438",
  type: "page-type/movie",
  slug: "the-santa-class",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2024-12-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1361225",
      externalLink: "https://www.themoviedb.org/movie/1361225",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Santa Class",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt32684804",
  posterPath: "/gxgpLCC1TJIwLauSJo4hTokAJD5.jpg",
  voteAverage: 8,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
