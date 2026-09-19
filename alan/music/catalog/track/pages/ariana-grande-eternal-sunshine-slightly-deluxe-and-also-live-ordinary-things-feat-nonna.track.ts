import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeEternalSunshineSlightlyDeluxeAndAlsoLiveOrdinaryThingsFeatNonna = {
  id: "01a0a6c5-14b9-7829-afea-2f628d2018ac",
  type: "page-type/track",
  slug: "ariana-grande-eternal-sunshine-slightly-deluxe-and-also-live-ordinary-things-feat-nonna",
  ownLength: 2.808333333333333,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-eternal-sunshine-slightly-deluxe-and-also-live"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0TRiAXUwYAHo4sQKMgcZZG",
      externalLink: "https://open.spotify.com/track/0TRiAXUwYAHo4sQKMgcZZG",
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
} as const satisfies Track
