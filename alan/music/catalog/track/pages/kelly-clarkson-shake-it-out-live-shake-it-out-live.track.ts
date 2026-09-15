import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonShakeItOutLiveShakeItOutLive = {
  id: "01a0a5ae-db54-7963-ab5b-a22c819e23f0",
  type: "track",
  slug: "kelly-clarkson-shake-it-out-live-shake-it-out-live",
  ownLength: 4.481166666666667,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-shake-it-out-live"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5ef8AscqwlqW9L1Gyuq7LB",
      externalLink: "https://open.spotify.com/track/5ef8AscqwlqW9L1Gyuq7LB",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Shake It Out - Live",
} as const satisfies Track
