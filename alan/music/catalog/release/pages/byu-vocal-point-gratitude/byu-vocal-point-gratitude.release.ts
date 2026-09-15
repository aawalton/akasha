import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const byuVocalPointGratitude = {
  id: "01a0676a-d71f-7027-9442-003a14c2eb9b",
  type: "page-type/release",
  slug: "byu-vocal-point-gratitude",
  title: "Gratitude",
  partOfCollections: ["artist/byu-vocal-point"],
  position: 0,
  ownLength: 5.305233,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2023-11-24",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2nINaFm4H50Y7Sej2mqANH",
      externalLink: "https://open.spotify.com/album/2nINaFm4H50Y7Sej2mqANH",
      lastSyncedAt: "2026-03-02",
    },
  ],
} as const satisfies Release
