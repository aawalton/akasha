import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixTheLuckyOnesDeluxe = {
  id: "01a0676a-d72d-703c-9aad-da29b12b0f4b",
  type: "page-type/release",
  slug: "pentatonix-the-lucky-ones-deluxe",
  title: "The Lucky Ones (Deluxe)",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2021-09-10",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2ryebd6mWqm1tI2Wr4ZbMp",
      externalLink: "https://open.spotify.com/album/2ryebd6mWqm1tI2Wr4ZbMp",
    },
  ],
  createdAt: "2026-09-03T13:17:30.285Z",
  updatedAt: "2026-10-19T14:01:29.522Z",
  progressedAt: "2026-10-19T14:01:29.522Z",
} as const satisfies Release
