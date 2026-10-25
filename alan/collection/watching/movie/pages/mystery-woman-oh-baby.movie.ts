import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mysteryWomanOhBaby = {
  id: "01a17497-3829-7234-bdf6-aa66570c470b",
  type: "page-type/movie",
  slug: "mystery-woman-oh-baby",
  ownLength: 81,
  ownProgress: 0,
  partOfCollections: ["franchise/mystery-woman"],
  position: 9,
  publishedAt: "2006-08-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "215580",
      externalLink: "https://www.themoviedb.org/movie/215580",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Mystery Woman: Oh Baby",
  genres: ["Mystery", "Crime", "Thriller", "TV Movie"],
  imdbId: "tt0818120",
  posterPath: "/eJrlRfEWjBTbWInqmyYVB0tGchj.jpg",
  voteAverage: 6.8,
  streamingOn: ["UP Faith & Family Amazon Channel ", "UP Faith & Family Apple TV channel"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T20:44:53.349Z",
} as const satisfies Movie
