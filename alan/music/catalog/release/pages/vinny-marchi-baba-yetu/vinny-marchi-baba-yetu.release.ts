import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiBabaYetu = {
  id: "01a0b112-90c7-7ee1-a40f-11f2777eb94b",
  type: "page-type/release",
  slug: "vinny-marchi-baba-yetu",
  ownLength: 3.6075833333333334,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2025-11-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7mwPi2ee6PGPpDLfqIUoxc",
      externalLink: "https://open.spotify.com/album/7mwPi2ee6PGPpDLfqIUoxc",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Baba Yetu",
} as const satisfies Release
