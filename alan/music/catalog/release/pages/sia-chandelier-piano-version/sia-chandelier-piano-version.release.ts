import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const siaChandelierPianoVersion = {
  id: "01a0676a-d71a-7014-92e9-5428884e0280",
  type: "page-type/release",
  slug: "sia-chandelier-piano-version",
  title: "Chandelier (Piano Version)",
  partOfCollections: ["artist/sia"],
  position: 0,
  ownLength: 4.006667,
  ownProgress: 4.006667,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2014-09-09",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5jJssYihQiAJzdx3rgdbRz",
      externalLink: "https://open.spotify.com/album/5jJssYihQiAJzdx3rgdbRz",
      lastSyncedAt: "2025-11-27",
    },
  ],
} as const satisfies Release
