import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeOneLastTimeOneLastTime = {
  id: "01a0a6c5-3c8a-7ae9-8d2c-830f7fb8f0ae",
  type: "page-type/track",
  slug: "ariana-grande-one-last-time-one-last-time",
  ownLength: 3.2879666666666667,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-one-last-time"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1043bXNgWDCWM2rhvieIh9",
      externalLink: "https://open.spotify.com/track/1043bXNgWDCWM2rhvieIh9",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "One Last Time",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "onelasttime|66CXWjxzNUsdJxJ2JdwvnR|197278",
  song: "song/ariana-grande-one-last-time",
} as const satisfies Track
