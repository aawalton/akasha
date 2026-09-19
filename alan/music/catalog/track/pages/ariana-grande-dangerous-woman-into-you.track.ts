import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeDangerousWomanIntoYou = {
  id: "01a0a6c5-2b81-749b-8aaa-938d7c17608e",
  type: "page-type/track",
  slug: "ariana-grande-dangerous-woman-into-you",
  ownLength: 4.074,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-dangerous-woman"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "49gRYU6hBWgSH2JVixGkJq",
      externalLink: "https://open.spotify.com/track/49gRYU6hBWgSH2JVixGkJq",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Into You",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "intoyou|66CXWjxzNUsdJxJ2JdwvnR|244440",
  song: "song/ariana-grande-into-you",
} as const satisfies Track
