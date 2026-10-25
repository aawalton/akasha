import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const janeDoeTilDeathDoUsPart = {
  id: "01a17497-3827-7675-b345-fae37eaf5765",
  type: "page-type/movie",
  slug: "jane-doe-til-death-do-us-part",
  ownLength: 89,
  ownProgress: 0,
  partOfCollections: ["franchise/jane-doe"],
  position: 2,
  publishedAt: "2005-03-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "105443",
      externalLink: "https://www.themoviedb.org/movie/105443",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Jane Doe: Til Death Do Us Part",
  genres: ["Mystery", "TV Movie"],
  imdbId: "tt0438502",
  posterPath: "/tETZoj3R6yhuHFYpHsosVjG13fd.jpg",
  voteAverage: 6,
  streamingOn: ["UP Faith & Family Amazon Channel ", "UP Faith & Family Apple TV channel"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
