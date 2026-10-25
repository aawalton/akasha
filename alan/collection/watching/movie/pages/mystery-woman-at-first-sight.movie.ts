import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mysteryWomanAtFirstSight = {
  id: "01a17497-3829-7e8d-81a4-46d83b1ef80a",
  type: "page-type/movie",
  slug: "mystery-woman-at-first-sight",
  ownLength: 120,
  ownProgress: 0,
  partOfCollections: ["franchise/mystery-woman"],
  position: 6,
  publishedAt: "2006-01-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "137306",
      externalLink: "https://www.themoviedb.org/movie/137306",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Mystery Woman: At First Sight",
  genres: ["Thriller", "Crime", "Mystery", "TV Movie"],
  imdbId: "tt0487264",
  posterPath: "/yClng0JdrfyQEVzbdATnyuFgj7a.jpg",
  voteAverage: 6.3,
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
