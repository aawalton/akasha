import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeMyEverythingDeluxeOneLastTime = {
  id: "01a0a6c5-2d99-7128-b75a-a98c6e9d2dd6",
  type: "page-type/track",
  slug: "ariana-grande-my-everything-deluxe-one-last-time",
  ownLength: 3.2877666666666667,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-my-everything-deluxe"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7xoUc6faLbCqZO6fQEYprd",
      externalLink: "https://open.spotify.com/track/7xoUc6faLbCqZO6fQEYprd",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "One Last Time",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "onelasttime|66CXWjxzNUsdJxJ2JdwvnR|197266",
  song: "song/ariana-grande-one-last-time",
} as const satisfies Track
