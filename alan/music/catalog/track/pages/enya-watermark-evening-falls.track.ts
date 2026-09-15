import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaWatermarkEveningFalls = {
  id: "01a0a5b0-1f72-71ef-bc6c-cce452789311",
  type: "track",
  slug: "enya-watermark-evening-falls",
  ownLength: 3.8177666666666665,
  ownProgress: 0,
  partOfCollections: ["release/enya-watermark"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0aF9woXZLH6AH4ayrkVHhQ",
      externalLink: "https://open.spotify.com/track/0aF9woXZLH6AH4ayrkVHhQ",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Evening Falls...",
} as const satisfies Track
