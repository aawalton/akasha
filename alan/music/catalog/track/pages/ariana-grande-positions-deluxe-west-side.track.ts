import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePositionsDeluxeWestSide = {
  id: "01a0a6c5-1fe7-733e-bbd5-22c8fede63e2",
  type: "page-type/track",
  slug: "ariana-grande-positions-deluxe-west-side",
  ownLength: 2.2046333333333332,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-positions-deluxe"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7cFYqReKEigTxTm0bNE6YA",
      externalLink: "https://open.spotify.com/track/7cFYqReKEigTxTm0bNE6YA",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "west side",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "westside|66CXWjxzNUsdJxJ2JdwvnR|132278",
  song: "song/ariana-grande-west-side",
} as const satisfies Track
