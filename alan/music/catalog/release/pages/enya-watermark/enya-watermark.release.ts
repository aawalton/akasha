import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const enyaWatermark = {
  id: "01a0676a-d730-7021-b4df-40b283769c84",
  type: "page-type/release",
  slug: "enya-watermark",
  title: "Watermark",
  partOfCollections: ["artist/enya"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1988-01-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2FZ2y8Z5sTRSnnSa8DIPHz",
      externalLink: "https://open.spotify.com/album/2FZ2y8Z5sTRSnnSa8DIPHz",
    },
  ],
  createdAt: "2026-09-03T13:17:30.288Z",
  updatedAt: "2026-10-17T14:01:01.286Z",
} as const satisfies Release
