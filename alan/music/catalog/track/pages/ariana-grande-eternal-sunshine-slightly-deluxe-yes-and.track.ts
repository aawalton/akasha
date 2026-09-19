import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeEternalSunshineSlightlyDeluxeYesAnd = {
  id: "01a0a6c5-1983-7ac7-bf7e-916f4fd83ca9",
  type: "page-type/track",
  slug: "ariana-grande-eternal-sunshine-slightly-deluxe-yes-and",
  ownLength: 3.5832333333333333,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-eternal-sunshine-slightly-deluxe"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5Hqo6dHSTPilabNfzZ3MyP",
      externalLink: "https://open.spotify.com/track/5Hqo6dHSTPilabNfzZ3MyP",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "yes, and?",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "yesand|66CXWjxzNUsdJxJ2JdwvnR|214994",
  song: "song/ariana-grande-yes-and-2",
} as const satisfies Track
