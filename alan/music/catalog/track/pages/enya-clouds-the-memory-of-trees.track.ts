import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaCloudsTheMemoryOfTrees = {
  id: "01a0a5b0-2b88-7a3a-8975-656ea0e2fcbe",
  type: "track",
  slug: "enya-clouds-the-memory-of-trees",
  ownLength: 4.278883333333333,
  ownProgress: 0,
  partOfCollections: ["release/enya-clouds"],
  position: 15,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6WxKcFiDL5A7fe8OyBOZYm",
      externalLink: "https://open.spotify.com/track/6WxKcFiDL5A7fe8OyBOZYm",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "The Memory of Trees",
} as const satisfies Track
