import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYoursTrulyPiano = {
  id: "01a0a6c5-3008-7a66-8a09-5209b05b0193",
  type: "page-type/track",
  slug: "ariana-grande-yours-truly-piano",
  ownLength: 3.9071,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-yours-truly"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1xCqIXCApBgcjwRLostpKl",
      externalLink: "https://open.spotify.com/track/1xCqIXCApBgcjwRLostpKl",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Piano",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "piano|66CXWjxzNUsdJxJ2JdwvnR|234426",
  song: "song/ariana-grande-piano",
} as const satisfies Track
