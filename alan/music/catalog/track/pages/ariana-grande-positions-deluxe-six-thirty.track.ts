import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePositionsDeluxeSixThirty = {
  id: "01a0a6c5-1f6e-75f3-88fb-318ac75918c1",
  type: "page-type/track",
  slug: "ariana-grande-positions-deluxe-six-thirty",
  ownLength: 3.064566666666667,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-positions-deluxe"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4rJWTThj9EWR6UqD1eVyge",
      externalLink: "https://open.spotify.com/track/4rJWTThj9EWR6UqD1eVyge",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "six thirty",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "sixthirty|66CXWjxzNUsdJxJ2JdwvnR|183874",
  song: "song/ariana-grande-six-thirty",
} as const satisfies Track
