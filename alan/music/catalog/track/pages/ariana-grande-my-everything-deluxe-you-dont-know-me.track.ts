import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeMyEverythingDeluxeYouDontKnowMe = {
  id: "01a0a6c5-2f46-7b5f-8352-8e64e86532f3",
  type: "page-type/track",
  slug: "ariana-grande-my-everything-deluxe-you-dont-know-me",
  ownLength: 3.8953333333333333,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-my-everything-deluxe"],
  position: 15,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3hgl7EQwTutSm6PESsB7gZ",
      externalLink: "https://open.spotify.com/track/3hgl7EQwTutSm6PESsB7gZ",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "You Don't Know Me",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "youdontknowme|66CXWjxzNUsdJxJ2JdwvnR|233720",
  song: "song/ariana-grande-you-don-t-know-me",
} as const satisfies Track
