import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theDogLoverSGuideToDating = {
  id: "01a1749a-66c0-7c0c-91f7-9e21ea2b0165",
  type: "page-type/movie",
  slug: "the-dog-lover-s-guide-to-dating",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2023-01-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1056733",
      externalLink: "https://www.themoviedb.org/movie/1056733",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Dog Lover's Guide to Dating",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt24806922",
  posterPath: "/6A8VWRvG62zuCXc2jJBA2whU4QX.jpg",
  voteAverage: 5.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
