import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeSantaTellMeSantaTellMe = {
  id: "01a0a6c5-3aec-7297-a668-1e6fbf401152",
  type: "page-type/track",
  slug: "ariana-grande-santa-tell-me-santa-tell-me",
  ownLength: 3.40155,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-santa-tell-me"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0lizgQ7Qw35od7CYaoMBZb",
      externalLink: "https://open.spotify.com/track/0lizgQ7Qw35od7CYaoMBZb",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Santa Tell Me",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "santatellme|66CXWjxzNUsdJxJ2JdwvnR|204093",
} as const satisfies Track
