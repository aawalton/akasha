import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const rockTheHouse = {
  id: "01a17499-470e-717e-94ab-df75729b2153",
  type: "page-type/movie",
  slug: "rock-the-house",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2011-06-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "108153",
      externalLink: "https://www.themoviedb.org/movie/108153",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Rock the House",
  genres: ["Family", "Comedy", "Drama", "TV Movie"],
  imdbId: "tt1637652",
  posterPath: "/qrhEa4BtaAjEXTHuAjFR1V9b0io.jpg",
  voteAverage: 5.6,
  streamingOn: ["PixL Amazon Channel", "Xumo Play"],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
