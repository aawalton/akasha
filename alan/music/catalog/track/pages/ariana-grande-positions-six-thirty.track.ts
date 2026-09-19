import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePositionsSixThirty = {
  id: "01a0a6c5-21c5-7f94-b7fd-ed9adf4f5fd0",
  type: "page-type/track",
  slug: "ariana-grande-positions-six-thirty",
  ownLength: 3.064566666666667,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-positions"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2IKJtXeR5UsaUjZB46fTOK",
      externalLink: "https://open.spotify.com/track/2IKJtXeR5UsaUjZB46fTOK",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "six thirty",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "sixthirty|66CXWjxzNUsdJxJ2JdwvnR|183874",
  song: "song/ariana-grande-six-thirty",
} as const satisfies Track
