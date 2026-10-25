import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const findingJohnChristmas = {
  id: "01a17497-3826-7d79-8e28-80c5d07a8972",
  type: "page-type/movie",
  slug: "finding-john-christmas",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2003-11-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "52752",
      externalLink: "https://www.themoviedb.org/movie/52752",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Finding_John_Christmas" },
  ],
  title: "Finding John Christmas",
  genres: ["Family", "TV Movie"],
  imdbId: "tt0365390",
  posterPath: "/nMW7DoLS7Eci2mPnDQ1XYW3piN3.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
