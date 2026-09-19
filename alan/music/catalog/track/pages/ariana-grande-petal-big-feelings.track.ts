import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePetalBigFeelings = {
  id: "01a0a6c5-0488-7700-acda-d0bfcc6b63ac",
  type: "page-type/track",
  slug: "ariana-grande-petal-big-feelings",
  ownLength: 2.8937,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-petal"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6MFSqc8pzXlwfzXqWZEKd4",
      externalLink: "https://open.spotify.com/track/6MFSqc8pzXlwfzXqWZEKd4",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "big feelings",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "bigfeelings|66CXWjxzNUsdJxJ2JdwvnR|173622",
  song: "song/ariana-grande-big-feelings",
} as const satisfies Track
