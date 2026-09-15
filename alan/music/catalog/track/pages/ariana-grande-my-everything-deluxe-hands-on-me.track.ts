import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeMyEverythingDeluxeHandsOnMe = {
  id: "01a0a6c5-2ec6-7482-9a6e-971f454672cd",
  type: "page-type/track",
  slug: "ariana-grande-my-everything-deluxe-hands-on-me",
  ownLength: 3.2037666666666667,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-my-everything-deluxe"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1rNop31kdDmSj3Ds6xhIeS",
      externalLink: "https://open.spotify.com/track/1rNop31kdDmSj3Ds6xhIeS",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Hands On Me",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "5dHt1vcEm9qb8fCyLcB3HL", artistName: "A$AP Ferg" },
  ],
  trackKey: "handsonme|5dHt1vcEm9qb8fCyLcB3HL,66CXWjxzNUsdJxJ2JdwvnR|192226",
} as const satisfies Track
