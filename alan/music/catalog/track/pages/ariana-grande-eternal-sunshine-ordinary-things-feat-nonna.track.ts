import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeEternalSunshineOrdinaryThingsFeatNonna = {
  id: "01a0a6c5-1c4d-73ee-a9a1-2e876d415415",
  type: "page-type/track",
  slug: "ariana-grande-eternal-sunshine-ordinary-things-feat-nonna",
  ownLength: 2.808333333333333,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-eternal-sunshine"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4mHM5d2fK3n8xgymjf92w2",
      externalLink: "https://open.spotify.com/track/4mHM5d2fK3n8xgymjf92w2",
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
