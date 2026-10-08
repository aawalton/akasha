import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const katyPerryPrismDeluxe = {
  id: "01a0676a-d727-7022-a6dd-96f0b0934243",
  type: "page-type/release",
  slug: "katy-perry-prism-deluxe",
  title: "PRISM (Deluxe)",
  partOfCollections: ["artist/katy-perry"],
  position: 0,
  ownLength: 61.6892,
  ownProgress: 61.6892,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2013-10-18",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5MQBzs5YlZlE28mD9yUItn",
      externalLink: "https://open.spotify.com/album/5MQBzs5YlZlE28mD9yUItn",
    },
  ],
  createdAt: "2026-09-03T13:17:30.279Z",
  updatedAt: "2026-09-15T16:37:02.000Z",
} as const satisfies Release
