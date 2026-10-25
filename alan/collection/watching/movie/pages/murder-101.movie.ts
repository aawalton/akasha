import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const murder101 = {
  id: "01a17497-3829-7019-b1d2-fd41dae9e055",
  type: "page-type/movie",
  slug: "murder-101",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["franchise/murder-101"],
  position: 0,
  publishedAt: "2006-01-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "215594",
      externalLink: "https://www.themoviedb.org/movie/215594",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Murder 101",
  genres: ["TV Movie", "Mystery"],
  imdbId: "tt0491793",
  posterPath: "/jB19vrcqRehFBWVGx59JjvXyZ77.jpg",
  voteAverage: 7.2,
  streamingOn: ["UP Faith & Family Amazon Channel ", "UP Faith & Family Apple TV channel"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
