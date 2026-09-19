import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeDangerousWomanDangerousWoman = {
  id: "01a0a6c5-2b35-726c-b783-f1fb3d605b6a",
  type: "page-type/track",
  slug: "ariana-grande-dangerous-woman-dangerous-woman",
  ownLength: 3.9324333333333334,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-dangerous-woman"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1OhstguCoBQ4SXT8ugSmOl",
      externalLink: "https://open.spotify.com/track/1OhstguCoBQ4SXT8ugSmOl",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Dangerous Woman",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "dangerouswoman|66CXWjxzNUsdJxJ2JdwvnR|235946",
  song: "song/ariana-grande-dangerous-woman",
} as const satisfies Track
