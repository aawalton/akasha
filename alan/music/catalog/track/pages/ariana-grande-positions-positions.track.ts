import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePositionsPositions = {
  id: "01a0a6c5-228d-74a0-829f-81e2804292b2",
  type: "page-type/track",
  slug: "ariana-grande-positions-positions",
  ownLength: 2.8720666666666665,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-positions"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "35mvY5S1H3J2QZyna3TFe0",
      externalLink: "https://open.spotify.com/track/35mvY5S1H3J2QZyna3TFe0",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "positions",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "positions|66CXWjxzNUsdJxJ2JdwvnR|172324",
  song: "song/ariana-grande-positions",
} as const satisfies Track
