import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeMyEverythingDeluxeBreakYourHeartRightBack = {
  id: "01a0a6c5-2e51-7be2-8b8a-6e7675eb63de",
  type: "page-type/track",
  slug: "ariana-grande-my-everything-deluxe-break-your-heart-right-back",
  ownLength: 4.2231,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-my-everything-deluxe"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0HGcQDbRen8luCnwH53sNl",
      externalLink: "https://open.spotify.com/track/0HGcQDbRen8luCnwH53sNl",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Break Your Heart Right Back",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "73sIBHcqh3Z3NyqHKZ7FOL", artistName: "Childish Gambino" },
  ],
  trackKey: "breakyourheartrightback|66CXWjxzNUsdJxJ2JdwvnR,73sIBHcqh3Z3NyqHKZ7FOL|253386",
  song: "song/ariana-grande-break-your-heart-right-back",
} as const satisfies Track
