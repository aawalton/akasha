import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const mistletoeMurders = {
  id: "01a1749a-d17f-723b-819f-b5999f8c3bf4",
  type: "page-type/show",
  slug: "mistletoe-murders",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas", "show-collection/hallmark-mystery"],
  publishedAt: "2024-10-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "261317",
      externalLink: "https://www.themoviedb.org/tv/261317",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Mistletoe Murders",
  genres: ["Drama", "Mystery"],
  imdbId: "tt32378211",
  posterPath: "/8W9zyufl0IkIbOQchORIPqOPi69.jpg",
  voteAverage: 6.9,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "The Roku Channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:45.663Z",
  updatedAt: "2026-10-25T19:47:45.663Z",
} as const satisfies Show
