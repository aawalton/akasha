import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const holidazed = {
  id: "01a1749a-d17f-7404-8fa1-4aac1f65a413",
  type: "page-type/show",
  slug: "holidazed",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2024-11-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "227311",
      externalLink: "https://www.themoviedb.org/tv/227311",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Holidazed",
  genres: ["Comedy", "Drama"],
  imdbId: "tt27530846",
  posterPath: "/tAMKR1rWykwqJOjzSXEKMDD3yq3.jpg",
  voteAverage: 7.4,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
    "streaming-service/the-roku-channel",
  ],
  createdAt: "2026-10-25T19:47:45.663Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Show
