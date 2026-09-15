import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const siaRhapsodyOriginals = {
  id: "01a0676a-d728-7002-82dc-00f3dd3f4152",
  type: "page-type/release",
  slug: "sia-rhapsody-originals",
  title: "Rhapsody Originals",
  partOfCollections: ["artist/sia"],
  position: 0,
  ownLength: 17.0742,
  ownProgress: 17.0742,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2008-01-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1vSGerCBuSzmif0ye8pMhj",
      externalLink: "https://open.spotify.com/album/1vSGerCBuSzmif0ye8pMhj",
      lastSyncedAt: "2025-11-27",
    },
  ],
} as const satisfies Release
