import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeDangerousWomanTouchIt = {
  id: "01a0a6c5-2cba-72cf-a89d-d9da9042098c",
  type: "page-type/track",
  slug: "ariana-grande-dangerous-woman-touch-it",
  ownLength: 4.333333333333333,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-dangerous-woman"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7rlKlsYacU3PFLGD7ca1HL",
      externalLink: "https://open.spotify.com/track/7rlKlsYacU3PFLGD7ca1HL",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Touch It",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "touchit|66CXWjxzNUsdJxJ2JdwvnR|260000",
  song: "song/ariana-grande-touch-it",
} as const satisfies Track
