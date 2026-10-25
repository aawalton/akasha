import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const theWayHome = {
  id: "01a1749a-d17f-7d6a-ae8f-746a5be90873",
  type: "page-type/show",
  slug: "the-way-home",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2023-01-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "201836",
      externalLink: "https://www.themoviedb.org/tv/201836",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Way Home",
  genres: ["Drama", "Family", "Sci-Fi & Fantasy"],
  imdbId: "tt20221678",
  posterPath: "/kfKsJktZvK22sYX2gV2LjsdIz3u.jpg",
  voteAverage: 7.636,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Netflix",
    "Netflix Standard with Ads",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:45.663Z",
  updatedAt: "2026-10-25T19:47:45.663Z",
} as const satisfies Show
