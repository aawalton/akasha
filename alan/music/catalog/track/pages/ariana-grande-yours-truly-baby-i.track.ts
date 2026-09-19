import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYoursTrulyBabyI = {
  id: "01a0a6c5-2f86-7514-b2ba-e1377a177bca",
  type: "page-type/track",
  slug: "ariana-grande-yours-truly-baby-i",
  ownLength: 3.2933333333333334,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-yours-truly"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6EIsMa5lbvljYxqCkjZVDi",
      externalLink: "https://open.spotify.com/track/6EIsMa5lbvljYxqCkjZVDi",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Baby I",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "babyi|66CXWjxzNUsdJxJ2JdwvnR|197600",
  song: "song/ariana-grande-baby-i",
} as const satisfies Track
