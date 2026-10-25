import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mcbrideSemperFi = {
  id: "01a17497-3828-799b-b887-af6300bf5184",
  type: "page-type/movie",
  slug: "mcbride-semper-fi",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["franchise/mcbride"],
  position: 9,
  publishedAt: "2007-01-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "215584",
      externalLink: "https://www.themoviedb.org/movie/215584",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "McBride: Semper Fi",
  genres: ["Mystery", "Drama", "Crime"],
  imdbId: "tt0808368",
  posterPath: "/balPKoeH5MfxOwJOB8wlmhKLHmh.jpg",
  voteAverage: 6.4,
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T20:44:55.748Z",
} as const satisfies Movie
