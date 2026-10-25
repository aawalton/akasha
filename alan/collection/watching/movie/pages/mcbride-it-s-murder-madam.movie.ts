import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mcbrideItSMurderMadam = {
  id: "01a17497-3828-78e9-8dd1-ba49c95f930c",
  type: "page-type/movie",
  slug: "mcbride-it-s-murder-madam",
  ownLength: 120,
  ownProgress: 0,
  partOfCollections: ["franchise/mcbride"],
  position: 3,
  publishedAt: "2005-03-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "129433",
      externalLink: "https://www.themoviedb.org/movie/129433",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "McBride: It's Murder, Madam",
  genres: ["TV Movie", "Mystery"],
  imdbId: "tt0442811",
  posterPath: "/mjIg65C6i1Cbzk1BsiSpoxzYoeQ.jpg",
  voteAverage: 6.7,
  streamingOn: ["UP Faith & Family Amazon Channel ", "UP Faith & Family Apple TV channel"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T20:44:53.349Z",
} as const satisfies Movie
