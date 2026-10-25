import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const santaJr = {
  id: "01a17497-195d-7f6b-a2b0-c68bb8d4caa2",
  type: "page-type/movie",
  slug: "santa-jr",
  ownLength: 100,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2002-11-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "153219",
      externalLink: "https://www.themoviedb.org/movie/153219",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Santa_Jr." },
  ],
  title: "Santa Jr.",
  genres: ["Fantasy", "Comedy", "Romance", "TV Movie"],
  imdbId: "tt0338410",
  posterPath: "/3OngJwVgw04edp3KAYf6T9vJ7Mx.jpg",
  voteAverage: 5.6,
  streamingOn: [
    "UP Faith & Family Amazon Channel ",
    "UP Faith & Family Apple TV channel",
    "Xumo Play",
  ],
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Movie
