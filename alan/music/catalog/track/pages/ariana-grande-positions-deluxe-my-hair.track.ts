import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePositionsDeluxeMyHair = {
  id: "01a0a6c5-1fa7-7641-88bd-0dfbf3b2f45f",
  type: "page-type/track",
  slug: "ariana-grande-positions-deluxe-my-hair",
  ownLength: 2.6406,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-positions-deluxe"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5Ds3yH73nMHgkmJxcxqPrr",
      externalLink: "https://open.spotify.com/track/5Ds3yH73nMHgkmJxcxqPrr",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "my hair",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "myhair|66CXWjxzNUsdJxJ2JdwvnR|158436",
  song: "song/ariana-grande-my-hair",
} as const satisfies Track
