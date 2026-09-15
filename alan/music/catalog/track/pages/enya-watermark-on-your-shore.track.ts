import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaWatermarkOnYourShore = {
  id: "01a0a5b0-1ece-7817-8192-e4161b79288c",
  type: "page-type/track",
  slug: "enya-watermark-on-your-shore",
  ownLength: 4.004,
  ownProgress: 0,
  partOfCollections: ["release/enya-watermark"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "73CMWrPW9B2BYhx3OgRmhl",
      externalLink: "https://open.spotify.com/track/73CMWrPW9B2BYhx3OgRmhl",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "On Your Shore",
} as const satisfies Track
