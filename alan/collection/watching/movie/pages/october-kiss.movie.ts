import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const octoberKiss = {
  id: "01a17499-8948-7d9d-8f02-523199bfa4f7",
  type: "page-type/movie",
  slug: "october-kiss",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2015-10-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "362884",
      externalLink: "https://www.themoviedb.org/movie/362884",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "October Kiss",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt5076032",
  posterPath: "/ckM9x0qecmKmiBpZY7jToGiTAyX.jpg",
  voteAverage: 6.5,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
    "streaming-service/pluto-tv",
    "streaming-service/youtube-tv",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
