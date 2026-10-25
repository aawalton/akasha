import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mcbrideDogged = {
  id: "01a17497-3828-7301-92a7-7c212d470f4c",
  type: "page-type/movie",
  slug: "mcbride-dogged",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["franchise/mcbride"],
  position: 9,
  publishedAt: "2007-03-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "215583",
      externalLink: "https://www.themoviedb.org/movie/215583",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "McBride: Dogged",
  genres: ["Thriller", "Mystery"],
  imdbId: "tt0780566",
  posterPath: "/zS4teHSiVM4B7nV4cOHTRHEsBhR.jpg",
  voteAverage: 7,
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
