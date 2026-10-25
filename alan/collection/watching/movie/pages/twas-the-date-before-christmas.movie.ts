import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const twasTheDateBeforeChristmas = {
  id: "01a1749a-89ac-7ab9-8a68-a7071287ed99",
  type: "page-type/movie",
  slug: "twas-the-date-before-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2024-10-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1359717",
      externalLink: "https://www.themoviedb.org/movie/1359717",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Twas the Date Before Christmas",
  genres: ["TV Movie", "Comedy", "Romance", "Drama"],
  imdbId: "tt33503181",
  posterPath: "/jxfXnIvMsNJrBZFi9fX9ra8lkdo.jpg",
  voteAverage: 7.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
