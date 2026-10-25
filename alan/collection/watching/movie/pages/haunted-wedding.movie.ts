import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const hauntedWedding = {
  id: "01a1749a-89a8-7b6d-b640-eb6a9b80ad67",
  type: "page-type/movie",
  slug: "haunted-wedding",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2024-10-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1325884",
      externalLink: "https://www.themoviedb.org/movie/1325884",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Haunted Wedding",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt32660113",
  posterPath: "/dP6dsGiumlwuszQUJyBZvX979VL.jpg",
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
