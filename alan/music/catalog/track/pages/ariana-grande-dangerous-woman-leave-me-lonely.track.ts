import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeDangerousWomanLeaveMeLonely = {
  id: "01a0a6c5-2c1e-7700-a58f-4e1377ccc71a",
  type: "page-type/track",
  slug: "ariana-grande-dangerous-woman-leave-me-lonely",
  ownLength: 3.828,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-dangerous-woman"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4Xg2NUXyF7cgvwSOs6PiSa",
      externalLink: "https://open.spotify.com/track/4Xg2NUXyF7cgvwSOs6PiSa",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Leave Me Lonely",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "4ylR3zwA0zaapAu94fktwa", artistName: "Macy Gray" },
  ],
  trackKey: "leavemelonely|4ylR3zwA0zaapAu94fktwa,66CXWjxzNUsdJxJ2JdwvnR|229680",
  song: "song/ariana-grande-leave-me-lonely",
} as const satisfies Track
