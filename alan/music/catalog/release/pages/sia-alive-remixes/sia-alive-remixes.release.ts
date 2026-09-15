import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const siaAliveRemixes = {
  id: "01a0676a-d716-7016-a388-1ecef5138eab",
  type: "page-type/release",
  slug: "sia-alive-remixes",
  title: "Alive (Remixes)",
  partOfCollections: ["artist/sia"],
  position: 0,
  ownLength: 21.523317,
  ownProgress: 21.523317,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2015-12-08",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "30exPQxpNhdfQbN6RsvMOg",
      externalLink: "https://open.spotify.com/album/30exPQxpNhdfQbN6RsvMOg",
      lastSyncedAt: "2025-11-27",
    },
  ],
} as const satisfies Release
