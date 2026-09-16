import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const alexandriaFallenAngel = {
  id: "01a0676a-d71d-705e-863e-65d5759d7b49",
  type: "page-type/release",
  slug: "alexandria-fallen-angel",
  ownLength: 2.7624,
  ownProgress: 2.7624,
  partOfCollections: ["artist/alexandria"],
  position: 0,
  publishedAt: "2025-12-05",
  rank: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3Z6QaTdx2g0fKwCKE6TtA3",
      externalLink: "https://open.spotify.com/album/3Z6QaTdx2g0fKwCKE6TtA3",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Fallen Angel",
} as const satisfies Release
