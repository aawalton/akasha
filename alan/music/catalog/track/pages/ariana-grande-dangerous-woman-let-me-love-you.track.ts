import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeDangerousWomanLetMeLoveYou = {
  id: "01a0a6c5-2bd2-7e62-a843-65f422ff6035",
  type: "page-type/track",
  slug: "ariana-grande-dangerous-woman-let-me-love-you",
  ownLength: 3.731333333333333,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-dangerous-woman"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6VpLNElCyXW15cBixlnIu8",
      externalLink: "https://open.spotify.com/track/6VpLNElCyXW15cBixlnIu8",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Let Me Love You",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "55Aa2cqylxrFIXC767Z865", artistName: "Lil Wayne" },
  ],
  trackKey: "letmeloveyou|55Aa2cqylxrFIXC767Z865,66CXWjxzNUsdJxJ2JdwvnR|223880",
  song: "song/ariana-grande-let-me-love-you",
} as const satisfies Track
