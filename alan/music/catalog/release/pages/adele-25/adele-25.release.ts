import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const adele25 = {
  id: "01a0676a-d715-7005-abc1-b377f80368e5",
  type: "page-type/release",
  slug: "adele-25",
  title: "25",
  partOfCollections: ["artist/adele"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2015-11-20",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3AvPX1B1HiFROvYjLb5Qwi",
      externalLink: "https://open.spotify.com/album/3AvPX1B1HiFROvYjLb5Qwi",
      lastSyncedAt: "2026-02-09",
    },
  ],
  createdAt: "2026-09-03T13:17:30.261Z",
  updatedAt: "2026-09-24T21:00:29.000Z",
} as const satisfies Release
