import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const uncorked = {
  id: "01a17499-4710-71e2-a4d8-2ca1345d1ffe",
  type: "page-type/movie",
  slug: "uncorked",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2010-03-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "254053",
      externalLink: "https://www.themoviedb.org/movie/254053",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Uncorked_(2009_film)" },
  ],
  title: "Uncorked",
  genres: ["Drama", "Romance", "TV Movie"],
  imdbId: "tt1410068",
  posterPath: "/3fdwUAUIUOr1knUBZl6t1pR4Sp6.jpg",
  voteAverage: 5.7,
  streamingOn: ["Xumo Play"],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
