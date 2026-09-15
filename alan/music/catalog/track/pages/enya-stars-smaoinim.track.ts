import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaStarsSmaoinim = {
  id: "01a0a5b0-18b1-7e90-8fa1-39423e6f6f4a",
  type: "track",
  slug: "enya-stars-smaoinim",
  ownLength: 6.114,
  ownProgress: 0,
  partOfCollections: ["release/enya-stars"],
  position: 16,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2UzuhUglGB46pZtrtZnDpv",
      externalLink: "https://open.spotify.com/track/2UzuhUglGB46pZtrtZnDpv",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Smaoinim",
} as const satisfies Track
