import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const siaFlames = {
  id: "01a0676a-d71e-700c-bdc4-c52e3199a244",
  type: "page-type/release",
  slug: "sia-flames",
  title: "Flames",
  partOfCollections: ["artist/sia"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2018-03-22",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3B8J3BMp7lMA5YR5bUXHGK",
      externalLink: "https://open.spotify.com/album/3B8J3BMp7lMA5YR5bUXHGK",
      lastSyncedAt: "2025-11-27",
    },
  ],
  createdAt: "2026-09-03T13:17:30.270Z",
  updatedAt: "2026-10-20T14:01:30.339Z",
  progressedAt: "2026-10-20T14:01:30.339Z",
} as const satisfies Release
