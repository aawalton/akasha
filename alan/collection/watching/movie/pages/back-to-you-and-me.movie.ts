import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const backToYouAndMe = {
  id: "01a17497-3824-781e-9723-747663f3863f",
  type: "page-type/movie",
  slug: "back-to-you-and-me",
  ownLength: 92,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2005-07-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "130300",
      externalLink: "https://www.themoviedb.org/movie/130300",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Back to You and Me",
  genres: ["Drama", "Romance", "TV Movie"],
  imdbId: "tt0419816",
  posterPath: "/9hlpyEQnJYyOVOzQ1BmOeUQqdJA.jpg",
  voteAverage: 6.6,
  streamingOn: ["PixL Amazon Channel", "Xumo Play"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
