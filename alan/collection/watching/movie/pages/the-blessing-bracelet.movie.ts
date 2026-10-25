import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theBlessingBracelet = {
  id: "01a1749a-89ab-7b1f-8af4-fe9f27b95d38",
  type: "page-type/movie",
  slug: "the-blessing-bracelet",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2023-04-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1081745",
      externalLink: "https://www.themoviedb.org/movie/1081745",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Blessing Bracelet",
  genres: ["TV Movie", "Romance", "Drama"],
  imdbId: "tt27010304",
  posterPath: "/9DScIcL0cEIKcwSEz0jRfzEcGn.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
