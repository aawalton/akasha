import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mysticChristmas = {
  id: "01a1749a-66bf-705c-9736-7f45797ec6a1",
  type: "page-type/movie",
  slug: "mystic-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2023-10-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1142715",
      externalLink: "https://www.themoviedb.org/movie/1142715",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Mystic Christmas",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt27813285",
  posterPath: "/nYKLBXEOPfw2UK1FPLeIcrJgVji.jpg",
  voteAverage: 5.6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
