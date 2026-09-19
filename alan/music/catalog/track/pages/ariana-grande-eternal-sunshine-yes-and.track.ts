import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeEternalSunshineYesAnd = {
  id: "01a0a6c5-1bd6-7f2c-a0d9-6de80345c54e",
  type: "page-type/track",
  slug: "ariana-grande-eternal-sunshine-yes-and",
  ownLength: 3.5832333333333333,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-eternal-sunshine"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5D34wRmbFS29AjtTOP2QJe",
      externalLink: "https://open.spotify.com/track/5D34wRmbFS29AjtTOP2QJe",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "yes, and?",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "yesand|66CXWjxzNUsdJxJ2JdwvnR|214994",
  song: "song/ariana-grande-yes-and",
} as const satisfies Track
