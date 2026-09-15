import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const byuVocalPointThisChristmas = {
  id: "01a0676a-d72e-7028-ac04-48adcbc56776",
  type: "release",
  slug: "byu-vocal-point-this-christmas",
  title: "This Christmas",
  partOfCollections: ["artist/byu-vocal-point"],
  position: 0,
  ownLength: 3.2993,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2023-12-08",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "13GsJa1b2TZxO3nBzdNJXW",
      externalLink: "https://open.spotify.com/album/13GsJa1b2TZxO3nBzdNJXW",
      lastSyncedAt: "2026-03-02",
    },
  ],
} as const satisfies Release
