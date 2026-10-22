import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonBlueMoon = {
  id: "01a163de-95ad-7822-9ee8-178d136df268",
  type: "page-type/release",
  slug: "zara-larsson-blue-moon",
  ownLength: 6.124033333333333,
  ownProgress: 0,
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  publishedAt: "2026-10-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1wqnLiqd9x2fAM0VHHvb97",
      externalLink: "https://open.spotify.com/album/1wqnLiqd9x2fAM0VHHvb97",
      lastSyncedAt: "2026-10-22",
    },
  ],
  title: "Blue Moon",
  createdAt: "2026-10-22T13:48:14.124Z",
  updatedAt: "2026-10-22T13:48:14.124Z",
} as const satisfies Release
