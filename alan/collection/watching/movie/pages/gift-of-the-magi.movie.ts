import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const giftOfTheMagi = {
  id: "01a17499-470c-7655-a264-e90b3e9a46a2",
  type: "page-type/movie",
  slug: "gift-of-the-magi",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2010-12-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "138624",
      externalLink: "https://www.themoviedb.org/movie/138624",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Gift of the Magi",
  genres: ["Drama", "Romance", "TV Movie"],
  imdbId: "tt1785395",
  posterPath: "/5E5poOsbV3K81zRnQUlGhffqUMp.jpg",
  voteAverage: 4.8,
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
