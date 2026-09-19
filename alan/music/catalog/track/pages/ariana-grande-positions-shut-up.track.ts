import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePositionsShutUp = {
  id: "01a0a6c5-2129-7db3-88e1-125d1d7c497b",
  type: "page-type/track",
  slug: "ariana-grande-positions-shut-up",
  ownLength: 2.6285,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-positions"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3ko9jEHNt4O5fjKN65ULJp",
      externalLink: "https://open.spotify.com/track/3ko9jEHNt4O5fjKN65ULJp",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "shut up",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "shutup|66CXWjxzNUsdJxJ2JdwvnR|157710",
  song: "song/ariana-grande-shut-up",
} as const satisfies Track
