import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const hopeAtChristmas = {
  id: "01a17499-e803-7d25-a4be-33bc30d94d68",
  type: "page-type/movie",
  slug: "hope-at-christmas",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2018-11-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "550073",
      externalLink: "https://www.themoviedb.org/movie/550073",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Hope at Christmas",
  genres: ["Family", "Romance", "TV Movie"],
  imdbId: "tt9033640",
  posterPath: "/ylrt2AjyunjjsU4ZQQeTNaJH41H.jpg",
  voteAverage: 6.5,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
