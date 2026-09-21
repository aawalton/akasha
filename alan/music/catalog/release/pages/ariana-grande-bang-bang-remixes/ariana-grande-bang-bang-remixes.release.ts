import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeBangBangRemixes = {
  id: "01a0676a-d718-7016-b00d-a43928116d47",
  type: "page-type/release",
  slug: "ariana-grande-bang-bang-remixes",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2014-09-26",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3ONhXhn7uDBCAW3Jy6lQFX",
      externalLink: "https://open.spotify.com/album/3ONhXhn7uDBCAW3Jy6lQFX",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "Bang Bang (Remixes)",
} as const satisfies Release
