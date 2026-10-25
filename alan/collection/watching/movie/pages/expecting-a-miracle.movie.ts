import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const expectingAMiracle = {
  id: "01a17499-470c-76bb-ae39-b49e3be24c85",
  type: "page-type/movie",
  slug: "expecting-a-miracle",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2009-01-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "130805",
      externalLink: "https://www.themoviedb.org/movie/130805",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Expecting_a_Miracle" },
  ],
  title: "Expecting a Miracle",
  genres: ["TV Movie", "Drama"],
  imdbId: "tt1338590",
  posterPath: "/2KvDn9XH6A2dr8znXCEGUy798s6.jpg",
  voteAverage: 6.2,
  streamingOn: ["PixL Amazon Channel", "Xumo Play"],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
