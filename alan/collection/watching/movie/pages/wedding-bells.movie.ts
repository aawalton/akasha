import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const weddingBells = {
  id: "01a17499-a7d9-7c99-bc28-cafaf8cc4e38",
  type: "page-type/movie",
  slug: "wedding-bells",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2016-06-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "396392",
      externalLink: "https://www.themoviedb.org/movie/396392",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Wedding Bells",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt5670394",
  posterPath: "/kohsNsslQ6tsy4M8OTMxYmE0EqV.jpg",
  voteAverage: 6.1,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
