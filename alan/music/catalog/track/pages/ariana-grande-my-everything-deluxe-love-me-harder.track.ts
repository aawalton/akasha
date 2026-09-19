import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeMyEverythingDeluxeLoveMeHarder = {
  id: "01a0a6c5-2e77-7cba-a1b9-dbaad0760204",
  type: "page-type/track",
  slug: "ariana-grande-my-everything-deluxe-love-me-harder",
  ownLength: 3.93555,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-my-everything-deluxe"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5J4ZkQpzMUFojo1CtAZYpn",
      externalLink: "https://open.spotify.com/track/5J4ZkQpzMUFojo1CtAZYpn",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Love Me Harder",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "1Xyo4u8uXC1ZmMpatF05PJ", artistName: "The Weeknd" },
  ],
  trackKey: "lovemeharder|1Xyo4u8uXC1ZmMpatF05PJ,66CXWjxzNUsdJxJ2JdwvnR|236133",
  song: "song/ariana-grande-love-me-harder",
} as const satisfies Track
