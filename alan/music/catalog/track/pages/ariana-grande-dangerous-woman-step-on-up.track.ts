import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeDangerousWomanStepOnUp = {
  id: "01a0a6c5-2d17-7e96-b9d5-f22d81c07c60",
  type: "page-type/track",
  slug: "ariana-grande-dangerous-woman-step-on-up",
  ownLength: 3.0142166666666665,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-dangerous-woman"],
  position: 16,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3K1y89UHuAEZbpiSPbtAae",
      externalLink: "https://open.spotify.com/track/3K1y89UHuAEZbpiSPbtAae",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Step On Up",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "steponup|66CXWjxzNUsdJxJ2JdwvnR|180853",
  song: "song/ariana-grande-step-on-up",
} as const satisfies Track
