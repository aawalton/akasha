import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveByChance = {
  id: "01a17499-a7d6-7da9-9e8c-52fe97c76736",
  type: "page-type/movie",
  slug: "love-by-chance",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2016-04-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "385390",
      externalLink: "https://www.themoviedb.org/movie/385390",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love by Chance",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt5566660",
  posterPath: "/zJgGXJbvRAvmcrSDfPhF2MzzW3j.jpg",
  voteAverage: 5.9,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
