import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const marcoPolo = {
  id: "01a17497-3828-7baf-b6a4-f8c31daebba0",
  type: "page-type/movie",
  slug: "marco-polo",
  ownLength: 166,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2007-06-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "59557",
      externalLink: "https://www.themoviedb.org/movie/59557",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Marco_Polo_(2007_film)" },
  ],
  title: "Marco Polo",
  genres: ["Adventure", "Drama", "TV Movie", "History"],
  imdbId: "tt0813789",
  posterPath: "/6zG2hugRwC2x44IeI3CtOKiLBUd.jpg",
  voteAverage: 6.3,
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
