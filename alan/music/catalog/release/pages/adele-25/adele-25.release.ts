import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const adele25 = {
  id: "01a0676a-d715-7005-abc1-b377f80368e5",
  type: "page-type/release",
  slug: "adele-25",
  title: "25",
  partOfCollections: ["artist/adele"],
  position: 0,
  ownLength: 48.43161666666666,
  ownProgress: 48.431617,
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
} as const satisfies Release
