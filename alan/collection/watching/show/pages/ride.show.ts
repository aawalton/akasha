import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const ride = {
  id: "01a1749a-d17f-7917-9d2f-c4dd9a19f5e7",
  type: "page-type/show",
  slug: "ride",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2023-03-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "211562",
      externalLink: "https://www.themoviedb.org/tv/211562",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Ride",
  genres: ["Drama", "Western"],
  imdbId: "tt21043326",
  posterPath: "/t1wyw44AXs8Sw3lRVHPuowk3xsd.jpg",
  voteAverage: 7.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:45.663Z",
  updatedAt: "2026-10-25T19:47:45.663Z",
} as const satisfies Show
