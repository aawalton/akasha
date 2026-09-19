import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeDangerousWomanMoonlight = {
  id: "01a0a6c5-2b0d-7f43-8eb4-dd9c5c3059ff",
  type: "page-type/track",
  slug: "ariana-grande-dangerous-woman-moonlight",
  ownLength: 3.3726666666666665,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-dangerous-woman"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1qcJdr8TYuGjFhjRoYNC3e",
      externalLink: "https://open.spotify.com/track/1qcJdr8TYuGjFhjRoYNC3e",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Moonlight",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "moonlight|66CXWjxzNUsdJxJ2JdwvnR|202360",
  song: "song/ariana-grande-moonlight",
} as const satisfies Track
