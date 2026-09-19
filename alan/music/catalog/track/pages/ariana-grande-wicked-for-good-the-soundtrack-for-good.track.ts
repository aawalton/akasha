import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeWickedForGoodTheSoundtrackForGood = {
  id: "01a0a6c5-0ec8-7db0-8092-a17145a7bc31",
  type: "page-type/track",
  slug: "ariana-grande-wicked-for-good-the-soundtrack-for-good",
  ownLength: 6.284966666666667,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-wicked-for-good-the-soundtrack"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5shGj5OOnpmg4tQlFjyzZY",
      externalLink: "https://open.spotify.com/track/5shGj5OOnpmg4tQlFjyzZY",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "For Good",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "46UMQ0cW8ToR8egkBRwAxZ", artistName: "Cynthia Erivo" },
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
  ],
  trackKey: "forgood|46UMQ0cW8ToR8egkBRwAxZ,66CXWjxzNUsdJxJ2JdwvnR|377098",
  song: "song/ariana-grande-for-good",
} as const satisfies Track
