import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const retreatToYou = {
  id: "01a1749a-66c0-7359-9ebe-8913806a59ea",
  type: "page-type/movie",
  slug: "retreat-to-you",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2023-09-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1158693",
      externalLink: "https://www.themoviedb.org/movie/1158693",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Retreat to You",
  genres: ["TV Movie", "Romance", "Comedy"],
  imdbId: "tt28524429",
  posterPath: "/ldGWlZ7W9IXKWTtv4Wf94t7MfaW.jpg",
  voteAverage: 6.8,
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
