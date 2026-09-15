import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaWatermarkWatermark = {
  id: "01a0a5b0-1e91-7b31-905c-42c5c6f6b9e1",
  type: "page-type/track",
  slug: "enya-watermark-watermark",
  ownLength: 2.4273333333333333,
  ownProgress: 0,
  partOfCollections: ["release/enya-watermark"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2m8MwTvNHBYIqieOoQeyuY",
      externalLink: "https://open.spotify.com/track/2m8MwTvNHBYIqieOoQeyuY",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Watermark",
} as const satisfies Track
