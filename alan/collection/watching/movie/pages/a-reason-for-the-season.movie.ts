import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aReasonForTheSeason = {
  id: "01a1749a-a948-7642-9d3e-577f1d5310b3",
  type: "page-type/movie",
  slug: "a-reason-for-the-season",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2024-11-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1361240",
      externalLink: "https://www.themoviedb.org/movie/1361240",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Reason for the Season",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt33436942",
  posterPath: "/9HFQsvBPCra3P8vIzBB5I0Vuce8.jpg",
  voteAverage: 6.4,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
