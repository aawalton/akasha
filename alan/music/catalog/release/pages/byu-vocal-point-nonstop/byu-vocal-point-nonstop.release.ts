import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const byuVocalPointNonstop = {
  id: "01a0676a-d725-7077-85ec-7c7ddce6d695",
  type: "page-type/release",
  slug: "byu-vocal-point-nonstop",
  title: "Nonstop",
  partOfCollections: ["artist/byu-vocal-point"],
  position: 0,
  ownLength: 54.2408,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2008-03-25",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "29xGrZ25YFAuISXCTxK2oE",
      externalLink: "https://open.spotify.com/album/29xGrZ25YFAuISXCTxK2oE",
      lastSyncedAt: "2026-03-02",
    },
  ],
} as const satisfies Release
