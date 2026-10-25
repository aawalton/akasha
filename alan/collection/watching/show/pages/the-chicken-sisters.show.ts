import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const theChickenSisters = {
  id: "01a1749a-d17f-74e5-b64c-c14a7450c7e7",
  type: "page-type/show",
  slug: "the-chicken-sisters",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2024-09-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "254988",
      externalLink: "https://www.themoviedb.org/tv/254988",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Chicken Sisters",
  genres: ["Drama"],
  imdbId: "tt32359507",
  posterPath: "/eNFVyxZeb69HkMmCtl6Oh5A3eNe.jpg",
  voteAverage: 7.6,
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
