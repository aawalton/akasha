import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const fielderSChoice = {
  id: "01a17497-3825-7bd7-a82f-c99ce3663f6b",
  type: "page-type/movie",
  slug: "fielder-s-choice",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2005-06-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "109694",
      externalLink: "https://www.themoviedb.org/movie/109694",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Fielder's Choice",
  genres: ["Drama", "TV Movie", "Family"],
  imdbId: "tt0407788",
  posterPath: "/rieuEz1U45CpjC9UaZxkWYeV4cx.jpg",
  voteAverage: 5,
  streamingOn: ["Xumo Play"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
