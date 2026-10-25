import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aStrangerSHeart = {
  id: "01a17497-3824-7976-8542-5570a07028b5",
  type: "page-type/movie",
  slug: "a-stranger-s-heart",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2007-05-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "18375",
      externalLink: "https://www.themoviedb.org/movie/18375",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/A_Stranger's_Heart" },
  ],
  title: "A Stranger's Heart",
  genres: ["Drama", "Romance", "TV Movie"],
  imdbId: "tt0938291",
  posterPath: "/zdCcrK5dTNEZKi7GTtTCuHmT7uc.jpg",
  voteAverage: 5.5,
  streamingOn: ["Xumo Play"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
