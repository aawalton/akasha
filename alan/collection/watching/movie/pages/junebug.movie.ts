import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const junebug = {
  id: "01a1749a-89a9-79b8-99ef-b99afb9af7cd",
  type: "page-type/movie",
  slug: "junebug",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2024-08-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1310502",
      externalLink: "https://www.themoviedb.org/movie/1310502",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Junebug",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt32897452",
  posterPath: "/yDvimZHKqHTFQpQ7b1Xr801bHQi.jpg",
  voteAverage: 6.9,
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
