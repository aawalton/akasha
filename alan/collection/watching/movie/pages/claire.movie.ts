import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const claire = {
  id: "01a17497-3825-7cbb-97fb-7dbc96e1e611",
  type: "page-type/movie",
  slug: "claire",
  ownLength: 96,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2007-08-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "89249",
      externalLink: "https://www.themoviedb.org/movie/89249",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Claire",
  genres: ["TV Movie", "Drama", "Thriller"],
  imdbId: "tt0926284",
  posterPath: "/uMbCg5DlC5ZSWCYVIHIb0SQ0MQ6.jpg",
  voteAverage: 4.5,
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
