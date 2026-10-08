import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const elvisPresley2BlueHawaii = {
  id: "01a0676a-d719-701b-a423-846423498140",
  type: "page-type/release",
  slug: "elvis-presley-2-blue-hawaii",
  title: "Blue Hawaii",
  partOfCollections: ["artist/elvis-presley"],
  position: 0,
  ownLength: 32.14415,
  ownProgress: 32.14415,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1961-10-20",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7xe8VI48TxUpU1IIo0RfGi",
      externalLink: "https://open.spotify.com/album/7xe8VI48TxUpU1IIo0RfGi",
    },
  ],
  createdAt: "2026-09-03T13:17:30.265Z",
  updatedAt: "2026-09-15T16:35:10.000Z",
} as const satisfies Release
