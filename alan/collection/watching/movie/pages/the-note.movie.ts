import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theNote = {
  id: "01a17497-382b-7908-84df-251743709e49",
  type: "page-type/movie",
  slug: "the-note",
  ownLength: 86,
  ownProgress: 0,
  partOfCollections: ["franchise/the-note"],
  position: 1,
  publishedAt: "2007-12-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "30569",
      externalLink: "https://www.themoviedb.org/movie/30569",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/The_Note_(film)" },
  ],
  title: "The Note",
  genres: ["Drama", "Romance", "TV Movie"],
  imdbId: "tt1146321",
  posterPath: "/gh2kvD5CRqKtgPHXHckxTZK1jhn.jpg",
  voteAverage: 6.4,
  streamingOn: ["Amazon Prime Video", "Amazon Prime Video with Ads", "Tubi TV"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T20:44:55.748Z",
} as const satisfies Movie
