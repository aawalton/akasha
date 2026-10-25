import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const adventuresInLoveBirding = {
  id: "01a1749a-a948-7e3a-9ba0-9d7d0c741c26",
  type: "page-type/movie",
  slug: "adventures-in-love-birding",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2025-09-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1524554",
      externalLink: "https://www.themoviedb.org/movie/1524554",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Adventures in Love & Birding",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt36789088",
  posterPath: "/5djYq3z6wEmke5LHkB7DHZNPF5y.jpg",
  voteAverage: 7.2,
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
