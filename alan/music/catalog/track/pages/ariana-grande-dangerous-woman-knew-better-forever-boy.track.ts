import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeDangerousWomanKnewBetterForeverBoy = {
  id: "01a0a6c5-2cd9-721c-b67f-97eb8a6c98d3",
  type: "page-type/track",
  slug: "ariana-grande-dangerous-woman-knew-better-forever-boy",
  ownLength: 4.986883333333333,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-dangerous-woman"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1ywoy5kdf2LsG2019ClGjm",
      externalLink: "https://open.spotify.com/track/1ywoy5kdf2LsG2019ClGjm",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Knew Better / Forever Boy",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "knewbetterforeverboy|66CXWjxzNUsdJxJ2JdwvnR|299213",
  song: "song/ariana-grande-knew-better-forever-boy",
} as const satisfies Track
