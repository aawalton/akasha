import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theJuliusHouseAnAuroraTeagardenMystery = {
  id: "01a17499-a7d8-724e-a0e7-885f4d437a89",
  type: "page-type/movie",
  slug: "the-julius-house-an-aurora-teagarden-mystery",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/aurora-teagarden-mystery"],
  position: 4,
  publishedAt: "2016-10-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "414768",
      externalLink: "https://www.themoviedb.org/movie/414768",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Julius House: An Aurora Teagarden Mystery",
  genres: ["Mystery", "TV Movie", "Crime", "Drama"],
  imdbId: "tt5931726",
  posterPath: "/uBwyOSg4JtgoZEpz9WQGFSVu4Yu.jpg",
  voteAverage: 6.9,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
