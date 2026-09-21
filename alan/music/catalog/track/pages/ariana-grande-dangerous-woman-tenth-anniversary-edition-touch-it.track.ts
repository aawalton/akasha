import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeDangerousWomanTenthAnniversaryEditionTouchIt = {
  id: "01a0a6c5-0708-7dd6-8754-8538af532301",
  type: "page-type/track",
  slug: "ariana-grande-dangerous-woman-tenth-anniversary-edition-touch-it",
  ownLength: 4.333433333333334,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-dangerous-woman-tenth-anniversary-edition"],
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6uhqt6wYnJ7uaevzHGy8kY",
      externalLink: "https://open.spotify.com/track/6uhqt6wYnJ7uaevzHGy8kY",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Touch It",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "touchit|66CXWjxzNUsdJxJ2JdwvnR|260006",
  song: "song/ariana-grande-touch-it",
  carriedBy: [
    {
      release: "release/ariana-grande-dangerous-woman-tenth-anniversary-edition",
      discNumber: 1,
      position: 13,
      externalId: "6uhqt6wYnJ7uaevzHGy8kY",
      externalLink: "https://open.spotify.com/track/6uhqt6wYnJ7uaevzHGy8kY",
    },
  ],
} as const satisfies Track
