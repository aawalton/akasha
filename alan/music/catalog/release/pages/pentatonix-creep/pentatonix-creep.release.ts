import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixCreep = {
  id: "01a0676a-d71b-703c-a8d0-fcd21cd56736",
  type: "page-type/release",
  slug: "pentatonix-creep",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  publishedAt: "2023-05-11",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7uio0vmTBSF14NRAuuOu4T",
      externalLink: "https://open.spotify.com/album/7uio0vmTBSF14NRAuuOu4T",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Creep",
  createdAt: "2026-09-03T13:17:30.267Z",
  updatedAt: "2026-10-19T14:01:29.522Z",
  progressedAt: "2026-10-19T14:01:29.522Z",
} as const satisfies Release
