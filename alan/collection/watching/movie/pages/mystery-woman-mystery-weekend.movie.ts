import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mysteryWomanMysteryWeekend = {
  id: "01a17497-3829-70cf-9c23-75c22a9ca151",
  type: "page-type/movie",
  slug: "mystery-woman-mystery-weekend",
  ownLength: 120,
  ownProgress: 0,
  partOfCollections: ["franchise/mystery-woman"],
  position: 2,
  publishedAt: "2005-01-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "193146",
      externalLink: "https://www.themoviedb.org/movie/193146",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Mystery Woman: Mystery Weekend",
  genres: ["Mystery", "Crime", "TV Movie", "Thriller"],
  imdbId: "tt0427576",
  posterPath: "/sIyyFFJ9PGVh4NpovM0L0ps8LMd.jpg",
  voteAverage: 7.6,
  streamingOn: ["UP Faith & Family Amazon Channel ", "UP Faith & Family Apple TV channel"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T20:44:53.349Z",
} as const satisfies Movie
