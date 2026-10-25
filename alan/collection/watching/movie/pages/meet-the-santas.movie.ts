import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const meetTheSantas = {
  id: "01a17497-3828-76c7-b590-b8795a5ec4ab",
  type: "page-type/movie",
  slug: "meet-the-santas",
  ownLength: 96,
  ownProgress: 0,
  partOfCollections: ["franchise/single-santa-seeks-mrs-claus"],
  position: 2,
  publishedAt: "2005-12-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "393196",
      externalLink: "https://www.themoviedb.org/movie/393196",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Meet_the_Santas" },
  ],
  title: "Meet the Santas",
  genres: ["Family", "Comedy", "Fantasy", "TV Movie"],
  imdbId: "tt0491722",
  posterPath: "/b0Om0HyoWOk3i2RutDp8bFjVp6I.jpg",
  voteAverage: 5.2,
  streamingOn: [
    "UP Faith & Family Amazon Channel ",
    "UP Faith & Family Apple TV channel",
    "Xumo Play",
  ],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T20:44:53.349Z",
} as const satisfies Movie
