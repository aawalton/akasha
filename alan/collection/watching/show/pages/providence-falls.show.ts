import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const providenceFalls = {
  id: "01a1749a-d17f-7a96-a921-9e57cdaf382c",
  type: "page-type/show",
  slug: "providence-falls",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["franchise/providence-falls"],
  position: 2,
  publishedAt: "2025-08-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "297638",
      externalLink: "https://www.themoviedb.org/tv/297638",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Providence Falls",
  genres: ["Drama", "Family"],
  imdbId: "tt35166700",
  posterPath: "/wD2ZqawYZ9aySPZrQP9ds7laUyw.jpg",
  voteAverage: 7.333,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:45.663Z",
  updatedAt: "2026-10-25T20:45:31.132Z",
} as const satisfies Show
