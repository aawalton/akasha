import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeDangerousWomanBadDecisions = {
  id: "01a0a6c5-2c9b-7001-908a-1f342615cda0",
  type: "page-type/track",
  slug: "ariana-grande-dangerous-woman-bad-decisions",
  ownLength: 3.7737666666666665,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-dangerous-woman"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "76RIfPBraSmXWC9LryUztF",
      externalLink: "https://open.spotify.com/track/76RIfPBraSmXWC9LryUztF",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Bad Decisions",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "baddecisions|66CXWjxzNUsdJxJ2JdwvnR|226426",
  song: "song/ariana-grande-bad-decisions",
} as const satisfies Track
