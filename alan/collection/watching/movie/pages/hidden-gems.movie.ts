import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const hiddenGems = {
  id: "01a1749a-464b-72cc-b546-5cac7558a92b",
  type: "page-type/movie",
  slug: "hidden-gems",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2022-06-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "970895",
      externalLink: "https://www.themoviedb.org/movie/970895",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Hidden Gems",
  genres: ["TV Movie", "Romance", "Comedy"],
  imdbId: "tt20724154",
  posterPath: "/vgcxiduPt1siWT5E2QnQDZGNExF.jpg",
  voteAverage: 6.412,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
