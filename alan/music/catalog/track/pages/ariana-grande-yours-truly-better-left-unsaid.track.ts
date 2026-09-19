import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYoursTrulyBetterLeftUnsaid = {
  id: "01a0a6c5-30e5-7847-ab2e-371bb8413588",
  type: "page-type/track",
  slug: "ariana-grande-yours-truly-better-left-unsaid",
  ownLength: 3.5204333333333335,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-yours-truly"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5Pnny78GESkBSLnxFmhRYZ",
      externalLink: "https://open.spotify.com/track/5Pnny78GESkBSLnxFmhRYZ",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Better Left Unsaid",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "betterleftunsaid|66CXWjxzNUsdJxJ2JdwvnR|211226",
  song: "song/ariana-grande-better-left-unsaid",
} as const satisfies Track
