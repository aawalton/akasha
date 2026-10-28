import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aNovelNoel = {
  id: "01a1749a-a948-7fcc-9b13-90d55fbdc915",
  type: "page-type/movie",
  slug: "a-novel-noel",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2024-11-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1361244",
      externalLink: "https://www.themoviedb.org/movie/1361244",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Novel Noel",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt33829446",
  posterPath: "/nP3Azz2qIKoWqJElHbYq8J3s0Pa.jpg",
  voteAverage: 6.7,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
