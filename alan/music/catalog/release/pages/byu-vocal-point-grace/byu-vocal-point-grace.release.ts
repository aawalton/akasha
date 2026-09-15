import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const byuVocalPointGrace = {
  id: "01a0676a-d71f-7023-8c90-eb91a47ae69c",
  type: "page-type/release",
  slug: "byu-vocal-point-grace",
  title: "Grace",
  partOfCollections: ["artist/byu-vocal-point"],
  position: 0,
  ownLength: 44.9037,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2021-04-02",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0TtdgTi8CpXJSzmPYvMaIy",
      externalLink: "https://open.spotify.com/album/0TtdgTi8CpXJSzmPYvMaIy",
      lastSyncedAt: "2026-03-02",
    },
  ],
} as const satisfies Release
