import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3PopOnPiano = {
  id: "01a0676a-d727-7005-962e-ca0a48d7cb96",
  type: "page-type/release",
  slug: "the-piano-guys-3-pop-on-piano",
  title: "Pop On Piano",
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  ownLength: 49.705933,
  ownProgress: 49.705933,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2026-01-09",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0xaKxMnwxahtBt2cxgbaYH",
      externalLink: "https://open.spotify.com/album/0xaKxMnwxahtBt2cxgbaYH",
      lastSyncedAt: "2026-01-23",
    },
  ],
} as const satisfies Release
