import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const anAmericanInAusten = {
  id: "01a1749a-89a6-77d4-8bba-433b9adce76c",
  type: "page-type/movie",
  slug: "an-american-in-austen",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2024-02-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1221678",
      externalLink: "https://www.themoviedb.org/movie/1221678",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "An American in Austen",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt31068337",
  posterPath: "/aPurbvRNfJ3KOlSLXFPoD07Cazg.jpg",
  voteAverage: 6.8,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
