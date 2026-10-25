import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const polarOpposites = {
  id: "01a1749a-a94c-73eb-aecd-c1aab686e136",
  type: "page-type/movie",
  slug: "polar-opposites",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2025-01-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1396980",
      externalLink: "https://www.themoviedb.org/movie/1396980",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Polar Opposites",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt34937026",
  posterPath: "/155X36JZ1KLoXjHfF4DNXV8Yt57.jpg",
  voteAverage: 7.125,
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
