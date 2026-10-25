import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mysteryWomanRedemption = {
  id: "01a17497-3829-7edf-8a6a-d8c7399844cf",
  type: "page-type/movie",
  slug: "mystery-woman-redemption",
  ownLength: 77,
  ownProgress: 0,
  partOfCollections: ["franchise/mystery-woman"],
  position: 10,
  publishedAt: "2006-11-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "89258",
      externalLink: "https://www.themoviedb.org/movie/89258",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Mystery Woman: Redemption",
  genres: ["Mystery", "Crime", "Thriller", "TV Movie", "Drama"],
  imdbId: "tt0453382",
  posterPath: "/qjDl7fjWA2PIebUaYz44GK3vsDr.jpg",
  voteAverage: 6.7,
  streamingOn: ["UP Faith & Family Amazon Channel ", "UP Faith & Family Apple TV channel"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T20:44:53.349Z",
} as const satisfies Movie
