import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theChristmasCharade = {
  id: "01a1749a-89ab-7705-8448-514b2d3ae15a",
  type: "page-type/movie",
  slug: "the-christmas-charade",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2024-10-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1359867",
      externalLink: "https://www.themoviedb.org/movie/1359867",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Christmas Charade",
  genres: ["TV Movie", "Comedy", "Romance", "Drama"],
  imdbId: "tt33039603",
  posterPath: "/1jgFIqG7haKpxXnckzTw9pzlG4v.jpg",
  voteAverage: 6.7,
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
