import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const fallingTogether = {
  id: "01a1749a-89a8-770f-a172-aed4fb079620",
  type: "page-type/movie",
  slug: "falling-together",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2024-09-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1077910",
      externalLink: "https://www.themoviedb.org/movie/1077910",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Falling Together",
  genres: ["TV Movie", "Drama", "Romance"],
  imdbId: "tt20868568",
  posterPath: "/kk3111GZEUfBlJiY2iuOfAoc9vp.jpg",
  voteAverage: 6.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
