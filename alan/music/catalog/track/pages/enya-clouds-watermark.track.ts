import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaCloudsWatermark = {
  id: "01a0a5b0-29d2-7a4d-8552-781e5cdb41b6",
  type: "page-type/track",
  slug: "enya-clouds-watermark",
  ownLength: 2.423983333333333,
  ownProgress: 0,
  partOfCollections: ["release/enya-clouds"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4Q83j5H4Wk9YfXRyslWPbP",
      externalLink: "https://open.spotify.com/track/4Q83j5H4Wk9YfXRyslWPbP",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Watermark",
} as const satisfies Track
