import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeEternalSunshineSlightlyDeluxeOrdinaryThingsFeatNonna = {
  id: "01a0a6c5-1a0c-7ea0-b706-7598006034b7",
  type: "page-type/track",
  slug: "ariana-grande-eternal-sunshine-slightly-deluxe-ordinary-things-feat-nonna",
  ownLength: 2.808333333333333,
  ownProgress: 2.808333333333333,
  partOfCollections: ["release/ariana-grande-eternal-sunshine-slightly-deluxe"],
  position: 13,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1f8raciYdYBqsjv5v21S53",
      externalLink: "https://open.spotify.com/track/1f8raciYdYBqsjv5v21S53",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "ordinary things (feat. Nonna)",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "6maPmKkdwM4eyhz5O4lbkP", artistName: "Nonna" },
  ],
  trackKey: "ordinarythingsfeatnonna|66CXWjxzNUsdJxJ2JdwvnR,6maPmKkdwM4eyhz5O4lbkP|168500",
  song: "song/ariana-grande-ordinary-things",
  carriedBy: [
    {
      release: "release/ariana-grande-eternal-sunshine-slightly-deluxe",
      discNumber: 1,
      position: 13,
      externalId: "1f8raciYdYBqsjv5v21S53",
      externalLink: "https://open.spotify.com/track/1f8raciYdYBqsjv5v21S53",
    },
  ],
} as const satisfies Track
