import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const threeWiseWomen = {
  id: "01a17499-470f-78de-aa30-cd0f2df7c5d5",
  type: "page-type/movie",
  slug: "three-wise-women",
  ownLength: 87,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2010-12-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "81394",
      externalLink: "https://www.themoviedb.org/movie/81394",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Three Wise Women",
  genres: ["Family", "Romance", "TV Movie", "Drama"],
  imdbId: "tt1785645",
  posterPath: "/10BknehcvZ1ZdrgqEblE18XqvKe.jpg",
  voteAverage: 4.8,
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
