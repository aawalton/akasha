import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const ellaHendersonNoSleep = {
  id: "01a0676a-d725-7068-ade5-faea1205f1bc",
  type: "page-type/release",
  slug: "ella-henderson-no-sleep",
  title: "No Sleep",
  partOfCollections: ["artist/ella-henderson"],
  position: 0,
  ownLength: 2.8364,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2023-03-17",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6mf8HZ3jitYeIlejz9Lq9p",
      externalLink: "https://open.spotify.com/album/6mf8HZ3jitYeIlejz9Lq9p",
      lastSyncedAt: "2026-02-19",
    },
  ],
} as const satisfies Release
