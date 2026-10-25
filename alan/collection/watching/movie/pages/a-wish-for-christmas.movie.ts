import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aWishForChristmas = {
  id: "01a17499-a7d3-7169-94d6-e3bd7b2c66f6",
  type: "page-type/movie",
  slug: "a-wish-for-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2016-10-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "410314",
      externalLink: "https://www.themoviedb.org/movie/410314",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Wish for Christmas",
  genres: ["TV Movie", "Romance", "Drama", "Fantasy"],
  imdbId: "tt5676118",
  posterPath: "/9z81XnaxHJ7LYptef6augvgwake.jpg",
  voteAverage: 5.908,
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
