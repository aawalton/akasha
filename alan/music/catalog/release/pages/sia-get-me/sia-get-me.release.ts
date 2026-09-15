import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const siaGetMe = {
  id: "01a0676a-d71e-7053-956e-ed7eee801768",
  type: "page-type/release",
  slug: "sia-get-me",
  title: "Get Me",
  partOfCollections: ["artist/sia"],
  position: 0,
  ownLength: 10.5907,
  ownProgress: 10.5907,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2000-01-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2wpIozbP9fxGC0aBYk8yZV",
      externalLink: "https://open.spotify.com/album/2wpIozbP9fxGC0aBYk8yZV",
      lastSyncedAt: "2025-11-27",
    },
  ],
} as const satisfies Release
