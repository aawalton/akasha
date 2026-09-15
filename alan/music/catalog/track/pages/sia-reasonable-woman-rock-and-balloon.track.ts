import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaReasonableWomanRockAndBalloon = {
  id: "01a0a59b-faa5-717a-b583-6ecad2f0ff2b",
  type: "track",
  slug: "sia-reasonable-woman-rock-and-balloon",
  ownLength: 4.002833333333333,
  ownProgress: 0,
  partOfCollections: ["release/sia-reasonable-woman"],
  position: 15,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4z6dOq7x7fLFM230ajcjss",
      externalLink: "https://open.spotify.com/track/4z6dOq7x7fLFM230ajcjss",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Rock and Balloon",
} as const satisfies Track
