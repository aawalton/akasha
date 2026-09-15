import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaWatermarkTheLongships = {
  id: "01a0a5b0-1fac-7218-907b-30106ac20e19",
  type: "page-type/track",
  slug: "enya-watermark-the-longships",
  ownLength: 3.65555,
  ownProgress: 0,
  partOfCollections: ["release/enya-watermark"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1KYwpvwfrQQNnw2C0x8iGb",
      externalLink: "https://open.spotify.com/track/1KYwpvwfrQQNnw2C0x8iGb",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "The Longships",
} as const satisfies Track
