import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theCabin = {
  id: "01a17499-66a1-7bdc-a961-d32b5aa313b1",
  type: "page-type/movie",
  slug: "the-cabin",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2011-07-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "152413",
      externalLink: "https://www.themoviedb.org/movie/152413",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Cabin",
  genres: ["Comedy", "TV Movie"],
  imdbId: "tt1773067",
  posterPath: "/orGy4l1wUcwzrumPQyTtOdFj4LX.jpg",
  voteAverage: 6.2,
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
