import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaWatermarkRiver = {
  id: "01a0a5b0-1f90-770c-a921-e65b070ded28",
  type: "track",
  slug: "enya-watermark-river",
  ownLength: 3.2028833333333333,
  ownProgress: 0,
  partOfCollections: ["release/enya-watermark"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2VHND0umapOD58DZcogUwX",
      externalLink: "https://open.spotify.com/track/2VHND0umapOD58DZcogUwX",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "River",
} as const satisfies Track
