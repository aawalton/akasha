import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const letItSnow = {
  id: "01a17499-669f-77fc-8123-4dff53be36d0",
  type: "page-type/movie",
  slug: "let-it-snow",
  ownLength: 82,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2013-11-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "240906",
      externalLink: "https://www.themoviedb.org/movie/240906",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Let It Snow",
  genres: ["Drama", "Romance", "Family", "TV Movie"],
  imdbId: "tt3320502",
  posterPath: "/jSMMHOfSEaTma2xMEnyNzlrMJG5.jpg",
  voteAverage: 6.5,
  streamingOn: ["Great American Pure Flix Amazon Channel", "Pure Flix", "YouTube TV"],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
