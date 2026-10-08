import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioBreakUpWithMe = {
  id: "01a0676a-d719-7033-892b-0ef7fe27257d",
  type: "page-type/release",
  slug: "jessica-baio-break-up-with-me",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  publishedAt: "2024-08-16",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "27iWoB3vd2JNFmgbtttwKE",
      externalLink: "https://open.spotify.com/album/27iWoB3vd2JNFmgbtttwKE",
    },
  ],
  title: "break up with me",
  createdAt: "2026-09-03T13:17:30.265Z",
  updatedAt: "2026-09-21T23:00:38.000Z",
} as const satisfies Release
