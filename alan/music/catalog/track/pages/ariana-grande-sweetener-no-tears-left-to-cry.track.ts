import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeSweetenerNoTearsLeftToCry = {
  id: "01a0a6c5-2a33-7d6d-8f71-e5c204b2d42a",
  type: "page-type/track",
  slug: "ariana-grande-sweetener-no-tears-left-to-cry",
  ownLength: 3.432,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-sweetener"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2qT1uLXPVPzGgFOx4jtEuo",
      externalLink: "https://open.spotify.com/track/2qT1uLXPVPzGgFOx4jtEuo",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "no tears left to cry",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "notearslefttocry|66CXWjxzNUsdJxJ2JdwvnR|205920",
  song: "song/ariana-grande-no-tears-left-to-cry",
} as const satisfies Track
