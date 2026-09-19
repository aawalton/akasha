import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeMyEverythingDeluxeOnly1 = {
  id: "01a0a6c5-2f26-75de-a7f0-de0139824ee1",
  type: "page-type/track",
  slug: "ariana-grande-my-everything-deluxe-only-1",
  ownLength: 3.2331,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-my-everything-deluxe"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6LQzYkmd8ADbKOOEVDnlG4",
      externalLink: "https://open.spotify.com/track/6LQzYkmd8ADbKOOEVDnlG4",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Only 1",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "only1|66CXWjxzNUsdJxJ2JdwvnR|193986",
  song: "song/ariana-grande-only-1",
} as const satisfies Track
