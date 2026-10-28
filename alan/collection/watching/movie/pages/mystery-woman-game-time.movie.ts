import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mysteryWomanGameTime = {
  id: "01a17497-3829-712d-97f2-0aeb86ee1a1b",
  type: "page-type/movie",
  slug: "mystery-woman-game-time",
  ownLength: 105,
  ownProgress: 0,
  partOfCollections: ["franchise/mystery-woman"],
  position: 6,
  publishedAt: "2005-08-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "90867",
      externalLink: "https://www.themoviedb.org/movie/90867",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Mystery Woman: Game Time",
  genres: ["Mystery", "Crime", "Thriller", "TV Movie", "Drama"],
  imdbId: "tt0466388",
  posterPath: "/uajWesLaB7lmYQNe4JZJFwwIrY6.jpg",
  voteAverage: 6.6,
  streamingOn: ["streaming-service/up-faith-and-family"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
