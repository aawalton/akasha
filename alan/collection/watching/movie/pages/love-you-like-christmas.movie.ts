import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveYouLikeChristmas = {
  id: "01a17499-a7d6-705f-8133-7bd5f1319aae",
  type: "page-type/movie",
  slug: "love-you-like-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2016-12-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "421624",
      externalLink: "https://www.themoviedb.org/movie/421624",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love You Like Christmas",
  genres: ["Drama", "Romance", "TV Movie"],
  imdbId: "tt6131148",
  posterPath: "/3GwTYscLzIVimiLAlnEPSZS3mpf.jpg",
  voteAverage: 6.3,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
