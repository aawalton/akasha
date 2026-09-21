import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const greenDayHereComesTheShock = {
  id: "01a0676a-d720-702f-96a2-0838616b2081",
  type: "page-type/release",
  slug: "green-day-here-comes-the-shock",
  title: "Here Comes The Shock",
  partOfCollections: ["artist/green-day"],
  position: 0,
  ownLength: 2.567817,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  grade: "C",
  publishedAt: "2021-02-21",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1WqF4f0srVIgtTdymK1R4T",
      externalLink: "https://open.spotify.com/album/1WqF4f0srVIgtTdymK1R4T",
      lastSyncedAt: "2025-10-04",
    },
  ],
} as const satisfies Release
