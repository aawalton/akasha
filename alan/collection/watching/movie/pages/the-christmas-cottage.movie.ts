import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theChristmasCottage = {
  id: "01a17499-c95f-7c7c-b6ae-0d13e8b21a8a",
  type: "page-type/movie",
  slug: "the-christmas-cottage",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2017-12-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "480626",
      externalLink: "https://www.themoviedb.org/movie/480626",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Christmas Cottage",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt5997848",
  posterPath: "/qx2FnjqJGlw8BgIYRGVyid7rJ18.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
