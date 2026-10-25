import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveOnTheDanubeRoyalGetaway = {
  id: "01a1749a-a94b-7c6e-a8c4-06802074ac03",
  type: "page-type/movie",
  slug: "love-on-the-danube-royal-getaway",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/love-on-the-danube"],
  position: 1,
  publishedAt: "2024-09-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1329919",
      externalLink: "https://www.themoviedb.org/movie/1329919",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love on the Danube: Royal Getaway",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt33113344",
  posterPath: "/sJ5vbDUWKII6KE316Cn4uWmmjIp.jpg",
  voteAverage: 7.321,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-25T19:47:35.367Z",
} as const satisfies Movie
