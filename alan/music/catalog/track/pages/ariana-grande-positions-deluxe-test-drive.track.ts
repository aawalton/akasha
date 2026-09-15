import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePositionsDeluxeTestDrive = {
  id: "01a0a6c5-209e-73ce-9693-cae35568bfd6",
  type: "page-type/track",
  slug: "ariana-grande-positions-deluxe-test-drive",
  ownLength: 2.036233333333333,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-positions-deluxe"],
  position: 16,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3eZYOQO4UzKrUDYDghtnFw",
      externalLink: "https://open.spotify.com/track/3eZYOQO4UzKrUDYDghtnFw",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "test drive",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "testdrive|66CXWjxzNUsdJxJ2JdwvnR|122174",
} as const satisfies Track
