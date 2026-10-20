import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const siaLetSLove = {
  id: "01a0676a-d723-701d-87b2-63dd161fddeb",
  type: "page-type/release",
  slug: "sia-let-s-love",
  title: "Let's Love",
  partOfCollections: ["artist/sia"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2020-09-11",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4t9C75dy0UtR4JE7vNYQRr",
      externalLink: "https://open.spotify.com/album/4t9C75dy0UtR4JE7vNYQRr",
      lastSyncedAt: "2025-11-27",
    },
  ],
  createdAt: "2026-09-03T13:17:30.275Z",
  updatedAt: "2026-10-20T14:01:30.339Z",
  progressedAt: "2026-10-20T14:01:30.339Z",
} as const satisfies Release
