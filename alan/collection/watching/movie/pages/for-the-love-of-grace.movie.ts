import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const forTheLoveOfGrace = {
  id: "01a17499-470c-7312-8e63-becca8582c64",
  type: "page-type/movie",
  slug: "for-the-love-of-grace",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2008-08-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "52040",
      externalLink: "https://www.themoviedb.org/movie/52040",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "For the Love of Grace",
  genres: ["Drama", "Romance", "TV Movie"],
  imdbId: "tt1275626",
  posterPath: "/2wIDUmfCD62Pxqv4uCiyHYJW8ic.jpg",
  voteAverage: 4.1,
  streamingOn: ["Dove Amazon Channel"],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
