import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const twelveDatesTilChristmas = {
  id: "01a1749a-d17f-7e68-b352-c1029538791d",
  type: "page-type/show",
  slug: "twelve-dates-til-christmas",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2025-12-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "288586",
      externalLink: "https://www.themoviedb.org/tv/288586",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Twelve Dates 'Til Christmas",
  genres: ["Comedy"],
  imdbId: "tt36260876",
  posterPath: "/uY47XnLzJS02swuVHipXYl9epDE.jpg",
  voteAverage: 7.8,
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
