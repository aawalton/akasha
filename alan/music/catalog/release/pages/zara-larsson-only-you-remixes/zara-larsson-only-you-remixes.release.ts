import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonOnlyYouRemixes = {
  id: "01a0676a-d726-703c-9c11-5cea8131e17d",
  type: "page-type/release",
  slug: "zara-larsson-only-you-remixes",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  publishedAt: "2017-08-11",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3hkSh2CXNjWfqdsoOmnB8u",
      externalLink: "https://open.spotify.com/album/3hkSh2CXNjWfqdsoOmnB8u",
      lastSyncedAt: "2025-12-20",
    },
  ],
  title: "Only You + Remixes",
} as const satisfies Release
