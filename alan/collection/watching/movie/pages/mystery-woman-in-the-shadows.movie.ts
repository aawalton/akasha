import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mysteryWomanInTheShadows = {
  id: "01a17497-3829-7841-8964-4a7dce197aef",
  type: "page-type/movie",
  slug: "mystery-woman-in-the-shadows",
  ownLength: 82,
  ownProgress: 0,
  partOfCollections: ["franchise/mystery-woman"],
  position: 10,
  publishedAt: "2007-01-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "166442",
      externalLink: "https://www.themoviedb.org/movie/166442",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Mystery Woman: In the Shadows",
  genres: ["Mystery", "Crime", "TV Movie", "Thriller"],
  imdbId: "tt0828571",
  posterPath: "/5TAeWcj9EVjw1mxFiYlHGkf28jX.jpg",
  voteAverage: 6.3,
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
