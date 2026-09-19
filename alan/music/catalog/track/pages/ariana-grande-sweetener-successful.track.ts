import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeSweetenerSuccessful = {
  id: "01a0a6c5-29d5-7be9-ae30-b853631e20d9",
  type: "page-type/track",
  slug: "ariana-grande-sweetener-successful",
  ownLength: 3.7897666666666665,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-sweetener"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5YeHLHDdQ4nKHk81XFWhCU",
      externalLink: "https://open.spotify.com/track/5YeHLHDdQ4nKHk81XFWhCU",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "successful",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "successful|66CXWjxzNUsdJxJ2JdwvnR|227386",
  song: "song/ariana-grande-successful",
} as const satisfies Track
