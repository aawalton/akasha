import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayInMyPlace = {
  id: "01a0676a-d721-706a-9313-b5865d702d4a",
  type: "page-type/release",
  slug: "coldplay-in-my-place",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2002-08-05",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2fycwGrq4XpHHWoLR4hOzF",
      externalLink: "https://open.spotify.com/album/2fycwGrq4XpHHWoLR4hOzF",
    },
  ],
  title: "In My Place",
  createdAt: "2026-09-03T13:17:30.273Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
