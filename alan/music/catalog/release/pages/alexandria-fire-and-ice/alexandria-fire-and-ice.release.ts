import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const alexandriaFireAndIce = {
  id: "01a0676a-d71d-707b-b98c-50993da83f36",
  type: "page-type/release",
  slug: "alexandria-fire-and-ice",
  ownLength: 2.3349,
  ownProgress: 2.3349,
  partOfCollections: ["artist/alexandria"],
  position: 0,
  publishedAt: "2025-09-19",
  rank: "A",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3T77hVyF9yXGjvypA41fMS",
      externalLink: "https://open.spotify.com/album/3T77hVyF9yXGjvypA41fMS",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Fire and Ice",
} as const satisfies Release
