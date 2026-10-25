import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theChristmasSecret = {
  id: "01a17497-195e-76a1-9e05-4fa8449d8fa0",
  type: "page-type/movie",
  slug: "the-christmas-secret",
  ownLength: 100,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2000-12-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "81307",
      externalLink: "https://www.themoviedb.org/movie/81307",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/The_Christmas_Secret" },
  ],
  title: "The Christmas Secret",
  genres: ["Family", "Fantasy", "Drama", "TV Movie"],
  imdbId: "tt0272046",
  posterPath: "/tfBC2xdtK4X6vhYcGQCMUbhvxF6.jpg",
  voteAverage: 5.9,
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Movie
