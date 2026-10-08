import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiLockedDown = {
  id: "01a0676a-d723-705f-9e67-db299881a20c",
  type: "page-type/release",
  slug: "vinny-marchi-locked-down",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2022-05-04",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2GNRWSKNCCyGrntPGMKiiP",
      externalLink: "https://open.spotify.com/album/2GNRWSKNCCyGrntPGMKiiP",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "LOCKED DOWN",
  createdAt: "2026-09-03T13:17:30.275Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
