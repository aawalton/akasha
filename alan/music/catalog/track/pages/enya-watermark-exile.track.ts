import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaWatermarkExile = {
  id: "01a0a5b0-1f0b-7c46-8567-63ab5d64b858",
  type: "page-type/track",
  slug: "enya-watermark-exile",
  ownLength: 4.362666666666667,
  ownProgress: 0,
  partOfCollections: ["release/enya-watermark"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2hMD3SnrBsre1mzptGRn6Z",
      externalLink: "https://open.spotify.com/track/2hMD3SnrBsre1mzptGRn6Z",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Exile",
} as const satisfies Track
