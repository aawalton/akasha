import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveIsAFourLetterWord = {
  id: "01a17497-3827-79b4-b1d1-3d1e649df6bc",
  type: "page-type/movie",
  slug: "love-is-a-four-letter-word",
  ownLength: 95,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2007-02-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "354638",
      externalLink: "https://www.themoviedb.org/movie/354638",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love Is a Four Letter Word",
  genres: ["Comedy", "Romance", "TV Movie"],
  imdbId: "tt0866438",
  posterPath: "/fKC9RSbCtDbgsV8jvI6T03IOixU.jpg",
  voteAverage: 5.3,
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
