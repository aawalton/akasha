import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeFocus = {
  id: "01a0676a-d71e-7019-baa0-12ddc03d9b26",
  type: "page-type/release",
  slug: "ariana-grande-focus",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2015-10-30",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3IGM1sXYke2UGII2DORrof",
      externalLink: "https://open.spotify.com/album/3IGM1sXYke2UGII2DORrof",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "Focus",
  createdAt: "2026-09-03T13:17:30.270Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
