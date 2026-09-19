import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeMyEverythingDeluxeWhyTry = {
  id: "01a0a6c5-2dbe-7c92-9144-0b59aeac5f29",
  type: "page-type/track",
  slug: "ariana-grande-my-everything-deluxe-why-try",
  ownLength: 3.5313333333333334,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-my-everything-deluxe"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "40fHWRL8bKcl5J4t4OKUiW",
      externalLink: "https://open.spotify.com/track/40fHWRL8bKcl5J4t4OKUiW",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Why Try",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "whytry|66CXWjxzNUsdJxJ2JdwvnR|211880",
  song: "song/ariana-grande-why-try",
} as const satisfies Track
